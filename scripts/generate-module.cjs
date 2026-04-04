#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pluralize = require('pluralize');

const args = process.argv.slice(2);
const moduleName = args[0];

if (!moduleName) {
  console.error('Usage: pnpm generate:module <module-name>');
  console.error('Example: pnpm generate:module product');
  process.exit(1);
}

const pascalCase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const camelCase = (str) => str.charAt(0).toLowerCase() + str.slice(1);

const singular = pluralize.singular(moduleName);
const plural = pluralize.plural(moduleName);

const replacements = {
  '{{PascalSingular}}': pascalCase(singular),
  '{{PascalPlural}}': pascalCase(plural),
  '{{camelSingular}}': camelCase(singular),
  '{{camelPlural}}': camelCase(plural),
  '{{singular}}': singular,
  '{{plural}}': plural,
};

const srcPath = path.join(__dirname, '..', 'src');
const templatesPath = path.join(__dirname, 'templates', 'module');
const pageTemplatePath = path.join(__dirname, 'templates', 'page');
const modulePath = path.join(srcPath, 'modules', plural);
const pagePath = path.join(srcPath, 'pages', `${replacements['{{PascalPlural}}']}Page.tsx`);
const routesPath = path.join(srcPath, 'routes', 'dashboard.tsx');
const sidebarPath = path.join(srcPath, 'layouts', 'DashboardLayout', 'Sidebar.tsx');

const fileMapping = {
  'types/Entity.ts.tpl': `types/${replacements['{{PascalSingular}}']}.ts`,
  'types/CreateEntityRequest.ts.tpl': `types/Create${replacements['{{PascalSingular}}']}Request.ts`,
  'types/UpdateEntityRequest.ts.tpl': `types/Update${replacements['{{PascalSingular}}']}Request.ts`,
  'types/index.ts.tpl': 'types/index.ts',
  'api/entityAPI.ts.tpl': `api/${replacements['{{camelPlural}}']}API.ts`,
  'constants/query-keys.ts.tpl': 'constants/query-keys.ts',
  'constants/index.ts.tpl': 'constants/index.ts',
  'services/useEntities.ts.tpl': `services/use${replacements['{{PascalPlural}}']}.ts`,
  'services/useEntity.ts.tpl': `services/use${replacements['{{PascalSingular}}']}.ts`,
  'services/useCreateEntity.ts.tpl': `services/useCreate${replacements['{{PascalSingular}}']}.ts`,
  'services/useUpdateEntity.ts.tpl': `services/useUpdate${replacements['{{PascalSingular}}']}.ts`,
  'services/useDeleteEntity.ts.tpl': `services/useDelete${replacements['{{PascalSingular}}']}.ts`,
  'services/index.ts.tpl': 'services/index.ts',
  'libs/useEntitiesFilters.ts.tpl': `libs/use${replacements['{{PascalPlural}}']}Filters.ts`,
  'libs/index.ts.tpl': 'libs/index.ts',
  'ui/EntitiesTable.tsx.tpl': `ui/${replacements['{{PascalPlural}}']}Table.tsx`,
  'ui/EntitiesFilters.tsx.tpl': `ui/${replacements['{{PascalPlural}}']}Filters.tsx`,
  'ui/CreateEntityModal.tsx.tpl': `ui/Create${replacements['{{PascalSingular}}']}Modal.tsx`,
  'ui/EditEntityModal.tsx.tpl': `ui/Edit${replacements['{{PascalSingular}}']}Modal.tsx`,
  'ui/DeleteEntityDialog.tsx.tpl': `ui/Delete${replacements['{{PascalSingular}}']}Dialog.tsx`,
  'ui/index.ts.tpl': 'ui/index.ts',
  'index.ts.tpl': 'index.ts',
};

function replaceTokens(content) {
  let result = content;
  for (const [token, value] of Object.entries(replacements)) {
    result = result.split(token).join(value);
  }
  return result;
}

console.log(`\nGenerating module: ${plural}\n`);

if (fs.existsSync(modulePath)) {
  console.error(`Error: Module "${plural}" already exists at ${modulePath}`);
  process.exit(1);
}

const dirs = ['api', 'constants', 'libs', 'services', 'types', 'ui'];
dirs.forEach((dir) => {
  fs.mkdirSync(path.join(modulePath, dir), { recursive: true });
});

for (const [templateFile, outputFile] of Object.entries(fileMapping)) {
  const templatePath = path.join(templatesPath, templateFile);
  const outputPath = path.join(modulePath, outputFile);

  if (!fs.existsSync(templatePath)) {
    console.error(`  Warning: Template not found: ${templateFile}`);
    continue;
  }

  const content = fs.readFileSync(templatePath, 'utf-8');
  const processedContent = replaceTokens(content);

  fs.writeFileSync(outputPath, processedContent);
  console.log(`  Created: ${outputFile}`);
}

function createPage() {
  const templatePath = path.join(pageTemplatePath, 'EntityPage.tsx.tpl');
  if (!fs.existsSync(templatePath)) {
    console.error('  Warning: Page template not found');
    return false;
  }

  const content = fs.readFileSync(templatePath, 'utf-8');
  const processedContent = replaceTokens(content);
  fs.writeFileSync(pagePath, processedContent);
  console.log(`  Created: pages/${replacements['{{PascalPlural}}']}Page.tsx`);
  return true;
}

function updateRoutes() {
  if (!fs.existsSync(routesPath)) {
    console.error('  Warning: Routes file not found');
    return false;
  }

  let content = fs.readFileSync(routesPath, 'utf-8');
  const PascalPlural = replacements['{{PascalPlural}}'];

  const lazyImport = `const ${PascalPlural}Page = lazy(() => import('@/pages/${PascalPlural}Page').then((m) => ({ default: m.${PascalPlural}Page })));`;
  const lastLazyImportRegex = /const \w+Page = lazy\(\(\) =>[^;]+\);/g;
  const matches = content.match(lastLazyImportRegex);
  if (matches) {
    const lastImport = matches[matches.length - 1];
    content = content.replace(lastImport, `${lastImport}\n${lazyImport}`);
  }

  const routeEntry = `      {
        path: '${plural}',
        element: <${PascalPlural}Page />,
      },`;

  const childrenMatch = content.match(/children:\s*\[([\s\S]*?)\n {4}\]/);
  if (childrenMatch) {
    const childrenContent = childrenMatch[1];
    const lastRouteEndIndex = childrenContent.lastIndexOf('},');
    if (lastRouteEndIndex !== -1) {
      const insertPoint = childrenMatch.index + 'children: ['.length + lastRouteEndIndex + 2;
      content = content.slice(0, insertPoint) + '\n' + routeEntry + content.slice(insertPoint);
    }
  }

  fs.writeFileSync(routesPath, content);
  console.log(`  Updated: routes/dashboard.tsx`);
  return true;
}

function updateSidebar() {
  if (!fs.existsSync(sidebarPath)) {
    console.error('  Warning: Sidebar file not found');
    return false;
  }

  let content = fs.readFileSync(sidebarPath, 'utf-8');
  const PascalPlural = replacements['{{PascalPlural}}'];

  const fallbackIcon = 'Folder';

  const iconImportMatch = content.match(/import\s*{([^}]+)}\s*from\s*'@untitledui\/icons'/);
  if (iconImportMatch) {
    const existingIcons = iconImportMatch[1];
    if (!existingIcons.includes(fallbackIcon)) {
      const newIcons = existingIcons.trim() + `, ${fallbackIcon}`;
      content = content.replace(
        iconImportMatch[0],
        `import { ${newIcons} } from '@untitledui/icons'`,
      );
    }
  }

  const navItem = `{
    label: '${PascalPlural}',
    href: '/dashboard/${plural}',
    icon: ${fallbackIcon},
  }`;

  const settingsDividerMatch = content.match(/\{\s*divider:\s*true,\s*label:\s*'Settings',?\s*\}/);
  if (settingsDividerMatch) {
    content = content.replace(settingsDividerMatch[0], `${navItem},\n  ${settingsDividerMatch[0]}`);
  }

  fs.writeFileSync(sidebarPath, content);
  console.log(`  Updated: layouts/DashboardLayout/Sidebar.tsx`);
  return true;
}

createPage();
updateRoutes();
updateSidebar();

console.log(`\n✓ Module "${plural}" generated successfully!`);
console.log(`\nNext steps:`);
console.log(`  1. Update types in src/modules/${plural}/types/`);
console.log(`  2. Create UI components in src/modules/${plural}/ui/`);
console.log(`  3. Run 'npm run type-check' to verify\n`);
