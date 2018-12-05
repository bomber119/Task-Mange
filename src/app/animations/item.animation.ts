import { trigger, state, transition, style, animate } from '@angular/animations';

export const itemAnimation = trigger('itemAnimation', [
  state('out', style({'border-left-width': '5px'})),
  state('in', style({'border-left-width': '10px'})),
  transition('out => in', animate('100ms ease-in')),
  transition('in => out', animate('100ms ease-out')),
]);
