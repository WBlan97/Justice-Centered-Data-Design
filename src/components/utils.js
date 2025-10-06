import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:@d3";
import { utcFormat, utcParse } from "d3-time-format";

/**
 * EXPORTED FUNCTIONS
 */

export rollupByRaceAndStatus = (data) => {
  const dataWithOther = data.map(d => ({ ...d, status: statusSubset.includes(d.ballot_rtn_status) ? d.ballot_rtn_status : "OTHER"}))

  return d3.rollups(dataWithOther, v => d3.sum(v, d => d.count), d => d.race, d => d.status)
  .flatMap(([race, entries]) => {
    const total = d3.sum(entries, d => d[1]);
    return entries.map(([status, sum]) => ({race, status, sum, percentage: total ? sum / total : 0}))
  })
}

let parseDate = utcParse("%m, %d, %Y")
let formatWeekNumber = Number(utcFormat("%V"))


/**
 * 1. Create your general Date object function:
 *    mapDateObject().
 *    Pass in your `data` (Array of objects) and
 *    the property name for the date field, whose
 *    value is a string `dateString`.
**/
mapDateObject = (data, dateString) => {

  // 2. Use .map() to iterate the `data` and create new date props
  const updatedData = data.map((ballot) => {

    // 3. Create dynamic keys to use for new properties
    const objField = dateString+"_obj"
    const weekField = dateString+"_week"

    // 4. Skip any null request dates
    if (ballot[dateString] != null) {
      /**
       * 5. Assign a date object to a new
       *    property for each `ballot`
       *    called `objField`.
      **/
     ballot[objField] = parseDate(ballot[dateField])
    }
    return ballot
  })

  /**
   * 5. Sort the data by week numbers in ascending order.
   * I also recommend sorting your data
   * in ascending order before returning
   * it back, since you normally want your
   * data to mirror the concept recorded.
   * In this case, weeks are temporal data
   * in a chronological sequence: 1, 2, 3, ...
  **/
  const sortedData = updatedData.sort(
    // Works like an accessor function to pass two objects to compare
    (a, b) => {
      // Uses D3's ascending() function to sort by the given properties
      return ascending(a.ballot_req_dt_week, b.ballot_req_dt_week)
    }
  )

  // 6. Return the populated and sorted array of objects
  return sortedData

}