export enum OrderBy {
  Id = 'id',
  Price = 'price',
  Area = 'sqft',
  Bdrooms = 'bdrooms',
  lastEntered = 'createdAt',
  lastUpdated = 'updatedAt'
}

export enum OrderDir {
  orderAsc = 'ASC',
  orderDesc = 'DESC'
}

const enum StatusActionType {
  REHYDRATE = 'persist/REHYDRATE'
}

export enum AreaCode {
  'Franklin' = '06',
  'Gadsden' = '07',
  'Jackson' = '12',
  'Jefferson' = '05',
  'Liberty' = '11',
  'Madison' = '09',
  'Northeast Tallahasse' = '01',
  'Northwest Tallahasse' = '02',
  'Other' = '20',
  'Other Ga' = '21',
  'Southeast Tallahasse' = '03',
  'Southwest Tallahasse' = '04',
  'Taylor' = '10',
  'Wakulla 1' = 'WAK-1',
  'Wakulla 2' = 'WAK-2',
  'Wakulla 3' = 'WAK-3',
  'Wakulla 4' = 'WAK-4',
  'Wakulla 5' = 'WAK-5',
  'Wakulla 6' = 'WAK-6',
  'Wakulla 7' = 'WAK-7',
  'Wakulla 8' = 'WAK-8',
  'Wakulla Old' = '08'
}

export enum reverseAreaCode {
   ' 06' = 'Franklin',
   ' 07' = 'Gadsden',
   ' 12' = 'Jackson',
   ' 05' = 'Jefferson',
   ' 11' = 'Liberty',
   ' 09' = 'Madison',
   ' 01' = 'Northeast Tallahasse',
   ' 02' = 'Northwest Tallahasse',
   ' 20' = 'Other',
   ' 21' = 'Other Ga',
   ' 03' = 'Southeast Tallahasse',
   ' 04' = 'Southwest Tallahasse',
   ' 10' = 'Taylor',
   ' WAK-1' = 'Wakulla 1',
   ' WAK-2' = 'Wakulla 2',
   ' WAK-3' = 'Wakulla 3',
   ' WAK-4' = 'Wakulla 4',
   ' WAK-5' = 'Wakulla 5',
   ' WAK-6' = 'Wakulla 6',
   ' WAK-7' = 'Wakulla 7',
   ' WAK-8' = 'Wakulla 8',
   ' 08' = 'Wakulla Old'
}

export enum Status {
  'Active',
  'Back on Market',
  'Reduce Price',
  'New',
  'Increase Price',
  'First Right of Refusal',
  'Coming Soon',
  'Expired',
  'Sold/Comp',
  'Contingent',
  'Withdrawn',
  'Cancel',
  'Sold',
  'Pending',
  'Fell',
  'Rented',
  'Leased'
}

/***********************************/
/************* Reducer *************/
/***********************************/

export interface CriteriaState {
  pageSize?: number
  pageNumber?:number
  lowerPrice?: number
  upperPrice?: number
  listingStatus?: string
  lowerSqft?: number
  upperSqft?: number
  lowerBdrooms?: number
  upperBdrooms?: number
  lowerBthrooms?: number
  upperBthrooms?: number
  area?: string
  pool?: boolean
  fireplace?: boolean
  waterfront?: boolean
  internet?: boolean
  keyword?: string
  sortingBy?: OrderBy
  direction?: OrderDir
}

interface CriteriaAction {
  type: StatusActionType;
  payload: CriteriaState;
}

export const initCriteriaState: CriteriaState = {
  pageSize: 20,
  pageNumber: 1,
  listingStatus: 'Active,Back on Market,Reduce Price,New,Increase Price,First Right of Refusal,Coming Soon',
  area: AreaCode["Northeast Tallahasse"],
  pool: false,
  fireplace: false,
  waterfront: false,
  internet: false,
  keyword: '',
  sortingBy: OrderBy.lastUpdated,
  direction: OrderDir.orderDesc,
};

export function changeState(change: Partial<CriteriaState>) {
  return {
    type: StatusActionType.REHYDRATE,
    payload: change
  };
}

const criteriaReducer = (state: CriteriaState = initCriteriaState, action: CriteriaAction) => {
  switch (action.type) {
    case StatusActionType.REHYDRATE: {
      return {...state, ...action.payload};
    }
    default: return {...state, ...action.payload};
  }
};

export default criteriaReducer;