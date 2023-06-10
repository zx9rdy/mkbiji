import Vue from 'vue'
import lazy from '@/directives/lazy'
import akTooltipAutoShow from '@/directives/akTooltipAutoShow'

Vue.directive('lazy', lazy)
Vue.directive('ak-tooltip-auto-show', akTooltipAutoShow)
