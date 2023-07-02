import { CriteriaState } from 'Redux/Modules/Criteria';
import axios from 'axios';

export async function getListings(criteria: CriteriaState) {
  const crit: string[] = []
  if (criteria.pageSize) {crit.push(`pageSize=${criteria.pageSize}`)}
  if (criteria.pageNumber) {crit.push(`pageNumber=${criteria.pageNumber}`)}
  if (criteria.area) {crit.push(`area=${criteria.area}`)}
  if (criteria.lowerPrice) {crit.push(`lowerPrice=${criteria.lowerPrice}`)}
  if (criteria.upperPrice) {crit.push(`upperPrice=${criteria.upperPrice}`)}
  if (criteria.lowerSqft) {crit.push(`lowerSqft=${criteria.lowerSqft}`)}
  if (criteria.upperSqft) {crit.push(`upperSqft=${criteria.upperSqft}`)}
  if (criteria.lowerBdrooms) {crit.push(`lowerBdrooms=${criteria.lowerBdrooms}`)}
  if (criteria.upperBdrooms) {crit.push(`upperBdrooms=${criteria.upperBdrooms}`)}
  if (criteria.lowerBthrooms) {crit.push(`lowerBthrooms=${criteria.lowerBthrooms}`)}
  if (criteria.upperBthrooms) {crit.push(`upperBthrooms=${criteria.upperBthrooms}`)}
  if (criteria.listingStatus) {crit.push(`status=${criteria.listingStatus}`)}
  if (criteria.pool) {crit.push(`pool=${criteria.pool}`)}
  if (criteria.fireplace) {crit.push(`fireplace=${criteria.fireplace}`)}
  if (criteria.internet) {crit.push(`internet=${criteria.internet}`)}
  if (criteria.waterfront) {crit.push(`waterfront=${criteria.waterfront}`)}
  if (criteria.keyword) {crit.push(`keyword=${criteria.keyword}`)}
  if (criteria.sortingBy) {crit.push(`sortBy=${criteria.sortingBy}`)}
  if (criteria.direction) {crit.push(`sortDir=${criteria.direction}`)}
  const link = ('https://real-estate-api-production-d74b.up.railway.app/api/listings?')+((crit)?crit.join('&'):'')
  try {
    const result = await axios.get(link);
    return result.data;
  } catch (error) {
    return null;
  }
} 

export async function getSingleListing(id: number) {
  const link = `https://real-estate-api-production-d74b.up.railway.app/api/listings/${id}`
  try {
    const result = await axios.get(link);
    return result.data;
  } catch (error) {
    return null;
  }
} 