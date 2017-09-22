import { AbsenceView } from '../dtos/absenceView';
import { AbsenceViewModel } from './absence-view.model';

export class AbsenceViewModelBuilder {

    static buildAbsenceViewModel(target: AbsenceViewModel, absenceViews: AbsenceView[]): void {
  
        target.absenceViews = absenceViews;

    }
}