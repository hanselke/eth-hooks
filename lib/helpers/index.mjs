import '../chunk-MEWEIBC4.mjs';
import { lazy } from 'react';

var lazier = (importFactory, importName) => {
  return lazy(() => {
    return importFactory().then((module) => ({ default: module[importName] }));
  });
};

export { lazier };
//# sourceMappingURL=index.mjs.map