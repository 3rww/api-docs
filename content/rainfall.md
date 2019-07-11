## Rainfall API

3 Rivers Wet Weather, with support from [Vieux Associates](http://www.vieuxinc.com/), uses calibrated data from the NEXRAD radar located in Moon Township, PA with rain gauge measurements collected during the same time period and rain event for every square kilometer in Allegheny County. The resulting rainfall data is equivalent in accuracy to having 2,276 rain gauges placed across the County. 3RWW has a massive repository of this high resolution spatiotemporal calibrated radar rainfall data for Allegheny County dating back to 2000 and including nearly 2 billion data points. This data is explorable on 3RWW's [Calibrated Radar Rainfall website](http://www.3riverswetweather.org/municipalities/calibrated-radar-rainfall-data).

The *3RWW Rainfall API* provides seamless access to current and *"historic"* rainfall data (older than 60 days from today) for the physical rain gauge data and calibrated pixel virtual rain gauge data (i.e., gauge-adjusted radar rainfall data, or *GARRD*).

Data | Source | Description | Get
---|---|---|---
Rainfall | 3RWW & Vieux Associates | ... | Get it here!

### Get Gauage Adjusted Radar Rainfall Data

Get rainfall totals for a point or area of interest, at a point in time or over time. This data comes from from 3RWW's virtual rain gauge system.

The data is by default returned as `JSON`. optionally return `GeoJSON`, a `CSV` table, or a `MD` (markdown) table.

```endpoint
POST http://api.3riverswetweather.org/api/v0/rainfall/garrd
```

Property | Description
---|---
`location` | An address, point of interest, or place name, (search via Esri) for which to get rainfall; alternatively, provide valid `GeoJSON` here to get rainfall for a specific area of interest.
`start` | The start date and time for which to get rainfall.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 18 2010 1:00PM will work").<br>If `end` is provided and this is set after that, `end` will be ignored.
`end` | (optional) The end date and time for which to get rainfall. If not provided, then this script will just return rainfall for the point in time specified by the `start` parameter.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 19 2010 1:00AM will work").<br>If this is set before `start`, it will be ignored.
`interval` | (optional) Specify interval for which rainfall totals will be provided: `5-minute`, `15-minute` (default), `Hourly` or `Daily`. Note that `5-minute` data is not available for all timeframes; in the absence of this data this endpoint will return `15-minute` data instead.
`zerofill` | (optional) Include time intervals with no rafinall (default); Set to `false` to omit those from the response
`f` | (optional) format of the response. `JSON` (default), `GEOJSON`, `CSV`, or `MD` (markdown table).
`geo` | (optional, defaults to `false`) include the pixel geometry in the response. If `JSON`, `CSV`, or `MD` are selected for parameter `f`, this will be provided in the `WKT` format in an additional property or column. If the `GEOJSON` format is selected for parameter `f`, then this parameter will be ignored and geometry will be returned according to the `GeoJSON` spec.

### Get Rain Gauge Data

Get physical rain gauge data. The data is returned as plain text, formated as `csv`.

```endpoint
POST http://api.3riverswetweather.org/api/v0/rainfall/gauge
```

Property | Description
---|---
`gauges` | A comma-separated list of gauge numbers in the range [1-34]
`location` | (optional) An address, point of interest, or place name, (search via Esri) for which to search for the closest gauge; alternatively, provide valid `GeoJSON` here and you'll get data back for return the closest gauge.
`start` | The start date and time for which to get rainfall.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 18 2010 1:00PM will work").<br>If `end` is provided and this is set after that, `end` will be ignored.
`end` | (optional) The end date and time for which to get rainfall. If not provided, then this script will just return rainfall for the point in time specified by the `start` parameter.<br>For best results, use the [ISO-8601 convention](https://en.wikipedia.org/wiki/ISO_8601) for your date/time string (e.g., `2013-02-04T22:44:30.652Z`; most scripting languages have ways to generate one of these); alternatively we'll attempt to parse whatever you provide (we're using the `python-dateutil` parser on the backend, so something like "June 19 2010 1:00AM will work").<br>If this is set before `start`, it will be ignored.
`interval` | (optional) Specify interval for which rainfall totals will be provided: `5-minute`, `15-minute` (default), `Hourly` or `Daily`. Note that `5-minute` data is not available for all timeframes; in the absence of this data this endpoint will return `15-minute` data instead.
`zerofill` | (optional) Include time intervals with no rafinall (default); Set to `false` to omit those from the response
`f` | (optional) format of the response. `JSON` (default), `GEOJSON`, `CSV`, or `MD` (markdown table).
`geo` | (optional, defaults to `false`) include the pixel geometry in the response. If `JSON`, `CSV`, or `MD` are selected for parameter `f`, this will be provided in the `WKT` format in an additional property or column. If the `GEOJSON` format is selected for parameter `f`, then this parameter will be ignored and geometry will be returned according to the `GeoJSON` spec.

