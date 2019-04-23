import {bloc} from 'jorum'
import {BehaviorSubject, Observable, Subject} from 'rxjs'
import {Color} from '../classes/color'
import {shareReplay, startWith, switchMap} from 'rxjs/operators'
import {apiService} from '../services/api.service'

@bloc
export class SchemaBloc {
  generate$ = new Subject<void>()
  schema$: Observable<Color[]> = this.generate$.pipe(
    switchMap(() => apiService.get(`generate/`)),
    shareReplay(1),
  )
  
}
