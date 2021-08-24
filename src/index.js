import useFolds from './folds'
import useThumbs from './thumbs'
import useLazyloads from './lazyloads'
import useWaves from './waves'
import useDrawer from './drawer'
import useElevator from './elevator'
import useLenses from './lenses'
import useCohere from './cohere'
import useMuzak from './muzak'

document.addEventListener('DOMContentLoaded', () => {
	useFolds()
	useThumbs()
	useLenses()
	useLazyloads()
	useWaves()
	useDrawer()
	useElevator()
	useCohere()
	useMuzak()
})
