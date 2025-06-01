import Balls from '@/components/aminations/Balls.vue'
import ColorsWaves from '@/components/aminations/ColorsWaves.vue'
import Cube from '@/components/aminations/Cube.vue'
import FlyingGhost from '@/components/aminations/FlyingGhost.vue'
import PulseCircle from '@/components/aminations/PulseCircle.vue'
import Pyromid3D from '@/components/aminations/Pyromid3D.vue'
import type { Component } from 'vue'

const LIST_OF_ANIMATIONS: Component[] = [null as unknown as Component, Balls, Cube, ColorsWaves, PulseCircle, Pyromid3D, FlyingGhost]

export default LIST_OF_ANIMATIONS
