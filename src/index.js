import useFolds from './folds';
import useThumbs from './thumbs';
import useLazyloads from './lazyloads';
import useWaves from './waves';
import useDrawer from './drawer';
import useElevator from './elevator';
import useLenses from './lenses';

document.addEventListener("DOMContentLoaded", () => {
  useFolds();
  useThumbs();
  useLazyloads();
  useWaves();
  useDrawer();
  useElevator();
  useLenses();
});
