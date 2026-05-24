.PHONY: install dev dev-student dev-parent dev-admin \
        build build-student build-parent build-admin \
        deploy-local clean

install:
	pnpm install

dev:
	pnpm dev

dev-student:
	pnpm dev:student

dev-parent:
	pnpm dev:parent

dev-admin:
	pnpm dev:admin

build: build-student build-parent build-admin

build-student:
	pnpm build:student

build-parent:
	pnpm build:parent

build-admin:
	pnpm build:admin

deploy-local: build
	mkdir -p /var/www/burro/apps/student /var/www/burro/apps/parent /var/www/burro/apps/admin
	rm -rf /var/www/burro/apps/student/dist /var/www/burro/apps/parent/dist /var/www/burro/apps/admin/dist
	cp -R apps/student/dist /var/www/burro/apps/student/dist
	cp -R apps/parent/dist /var/www/burro/apps/parent/dist
	cp -R apps/admin/dist /var/www/burro/apps/admin/dist

clean:
	rm -rf apps/student/dist apps/parent/dist apps/admin/dist
	rm -rf node_modules apps/student/node_modules apps/parent/node_modules apps/admin/node_modules packages/shared/node_modules
