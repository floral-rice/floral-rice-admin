import { createPinia, acceptHMRUpdate } from 'pinia';
import type { StoreDefinition } from 'pinia';
const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true });

const modules: Record<string, StoreDefinition> = {};
Object.keys(modulesFiles).forEach((modulePath) => {
  // console.log('modulePath=', modulePath);
  // set './modules/app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/modules\/(.*)\.\w+$/, '$1');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value = modulesFiles[modulePath] as any;
  modules[moduleName] = value.default;
}, {});

export const setupStore = (app) => {
  app.use(createPinia());
  Object.values(modules).forEach((fn) => {
    fn();
    if (import.meta.hot) {
      import.meta.hot.accept(acceptHMRUpdate(fn, import.meta.hot));
    }
  });
};

export default modules;
