## Rainfall API

*Note: This API is currently under development; headings and addresses below represent planned endpoints.*

3 Rivers Wet Weather, with support from [Vieux Associates](http://www.vieuxinc.com/), uses calibrated data from the NEXRAD radar located in Moon Township, PA with rain gauge measurements collected during the same time period and rain event for every square kilometer in Allegheny County. The resulting rainfall data is equivalent in accuracy to having 2,276 rain gauges placed across the County. 3RWW has a massive repository of this high resolution spatiotemporal calibrated radar rainfall data for Allegheny County dating back to 2000 and including nearly 2 billion data points. This data is explorable on 3RWW's [Calibrated Radar Rainfall website](http://www.3riverswetweather.org/municipalities/calibrated-radar-rainfall-data).

The *3RWW Rainfall API* provides seamless access to current and *"historic"* rainfall data (older than 60 days from today) for the physical rain gauge data and calibrated pixel virtual rain gauge data (i.e., gauge-adjusted radar rainfall data, or *GARRD*).

<!-- Data | Source | Description | Get
---|---|---|---
Rainfall | 3RWW & Vieux Associates | ... | Get it here! -->

### Get Gauage Adjusted Radar Rainfall Data

Get rainfall totals for a point or area of interest, at a point in time or over time. This data comes from from 3RWW's virtual rain gauge system.

In addition to rainfall values (as inches), each virtual gauge includes a metadata which indicates the source for the data. This column includes the codes:

|Metadata Source Code | Description|
|--- |--- |
|R|Calibrated radar rainfall data|
|G-0|No gauge or calibrated radar rainfall data is available, but not for the reasons given for N/D below|
|G-1|Derived from inverse distance squared weighting based on one rain gauge|
|G-2|Derived from inverse distance squared weighting based on two rain gauges|
|G-3|Derived from inverse distance squared weighting based on three rain gauges|
|N/D|No data was collected for this data point. This may be because no data was collected at the time or the pixel may be outside of the data collection boundary.|

The data is by default returned as `JSON`. optionally return `GeoJSON`, a `CSV` table, or a `MD` (markdown) table.

```endpoint
GET http://3rww-api.civicmapper.com/rainfall/v2/pixel
```

Request Parameter | Description
---|---
`location` | An address, point of interest, or place name, (search via Esri) for which to get rainfall; alternatively, provide valid `GeoJSON` here to get rainfall for a specific area of interest.
`start` | The start date and time for which to get rainfall.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 18 2010 1:00PM will work").<br>If `end` is provided and this is set after that, `end` will be ignored.
`end` | (optional) The end date and time for which to get rainfall. If not provided, then this script will just return rainfall for the point in time specified by the `start` parameter.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 19 2010 1:00AM will work").<br>If this is set before `start`, it will be ignored.
`interval` | (optional) Specify interval for which rainfall totals will be provided: `5-minute`, `15-minute` (default), `Hourly` or `Daily`. Note that `5-minute` data is not available for all timeframes; in the absence of this data this endpoint will return `15-minute` data instead.
`zerofill` | (optional) Include time intervals with no rafinall (default); Set to `false` to omit those from the response
`f` | (optional) format of the response. `JSON` (default), `GEOJSON`, `CSV`, or `MD` (markdown table).
`geo` | (optional, defaults to `false`) include the pixel geometry in the response. If `JSON`, `CSV`, or `MD` are selected for parameter `f`, this will be provided in the `WKT` format in an additional property or column. If the `GEOJSON` format is selected for parameter `f`, then this parameter will be ignored and geometry will be returned according to the `GeoJSON` spec.

### Get Rain Gauge Data

The data is by default returned as `JSON`. optionally return `GeoJSON`, a `CSV` table, or a `MD` (markdown) table.

```endpoint
GET http://3rww-api.civicmapper.com/rainfall/v2/raingauge
```

Request Parameter | Description
---|---
`gauges` | A comma-separated list of gauge numbers in the range [1-34]
`location` | (optional) An address, point of interest, or place name, (search via Esri) for which to search for the closest gauge; alternatively, provide valid `GeoJSON` here and you'll get data back for return the closest gauge.
`start` | The start date and time for which to get rainfall.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 18 2010 1:00PM will work").<br>If `end` is provided and this is set after that, `end` will be ignored.
`end` | (optional) The end date and time for which to get rainfall. If not provided, then this script will just return rainfall for the point in time specified by the `start` parameter.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 19 2010 1:00AM will work").<br>If this is set before `start`, it will be ignored.
`interval` | (optional) Specify interval for which rainfall totals will be provided: `5-minute`, `15-minute` (default), `Hourly` or `Daily`. Note that `5-minute` data is not available for all timeframes; in the absence of this data this endpoint will return `15-minute` data instead.
`zerofill` | (optional) Include time intervals with no rafinall (default); Set to `false` to omit those from the response
`f` | (optional) format of the response. `JSON` (default), `GEOJSON`, `CSV`, or `MD` (markdown table).
`geo` | (optional, defaults to `false`) include the pixel geometry in the response. If `JSON`, `CSV`, or `MD` are selected for parameter `f`, this will be provided in the `WKT` format in an additional property or column. If the `GEOJSON` format is selected for parameter `f`, then this parameter will be ignored and geometry will be returned according to the `GeoJSON` spec.

### Get Rainfall Events

Get a list of rainfall events. By default, returns a list of all rainfall events catalogued by Vieux Associates. Each event is represented by its start and end datetime following the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601).

```endpoint
POST http://3rww-api.civicmapper.com/rainfall/v2/events
```

Property | Description
---|---
`year` | (optional) Search for events within a specific year.
`month` | (optional) Search for events within a specific month. If this argument is specified and the `year` argument is not, the endpoint will return events for same month over all years.
