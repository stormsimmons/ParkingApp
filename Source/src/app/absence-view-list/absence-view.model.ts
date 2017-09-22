import { SearchDateCriteria } from '../dtos/searchDateCriteria';
import { AbsenceView } from '../dtos/absenceView';

export class AbsenceViewModel{
    selectedSearchDate: SearchDateCriteria;
    absenceViews: AbsenceView[];   
}