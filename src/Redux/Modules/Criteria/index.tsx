export enum OrderBy {
  'Price' = 'price',
  'Area in sq ft' = 'sqft',
  'Number of Bedrooms' = 'bdrooms',
  'Newest' = 'mls_id',
  'last Updated' = 'mls_update_date'
}

export enum OrderDir {
  orderAsc = 'ASC',
  orderDesc = 'DESC'
}

const enum StatusActionType {
  REHYDRATE = 'persist/REHYDRATE'
}

export enum AreaCode {
  'NE Tallahasse' = '01',
  'NW Tallahasse' = '02',
  'SE Tallahasse' = '03',
  'SW Tallahasse' = '04',
  'Jefferson' = '05',
  'Franklin' = '06',
  'Gadsden' = '07',
  'Wakulla Old' = '08',
  'Madison' = '09',
  'Taylor' = '10',
  'Liberty' = '11',
  'Jackson' = '12',
  'Other' = '20',
  'Other Ga' = '21',
  'Wakulla 1' = 'WAK-1',
  'Wakulla 2' = 'WAK-2',
  'Wakulla 3' = 'WAK-3',
  'Wakulla 4' = 'WAK-4',
  'Wakulla 5' = 'WAK-5',
  'Wakulla 6' = 'WAK-6',
  'Wakulla 7' = 'WAK-7',
  'Wakulla 8' = 'WAK-8'
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
  lowerPrice:0,
  upperPrice:10000000,
  lowerBdrooms:1,
  lowerBthrooms:1,
  pool: false,
  fireplace: false,
  waterfront: false,
  internet: false,
  keyword: '',
  sortingBy: OrderBy['last Updated'],
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