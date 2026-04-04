import { createQueryKeys } from '@/modules/common';

import type { Get{{PascalPlural}}Params } from '../api/{{camelPlural}}API';

export const {{camelSingular}}QueryKeys = createQueryKeys<Get{{PascalPlural}}Params>('{{plural}}');
