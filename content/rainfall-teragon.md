## Rainfall API (via Teragon)

3 Rivers Wet Weather, with support from [Vieux Associates](http://www.vieuxinc.com/), uses calibrated data from the NEXRAD radar located in Moon Township, PA with rain gauge measurements collected during the same time period and rain event for every square kilometer in Allegheny County. The resulting rainfall data is equivalent in accuracy to having 2,276 rain gauges placed across the County. 3RWW has a massive repository of this high resolution spatiotemporal calibrated radar rainfall data for Allegheny County dating back to 2000 and including nearly 2 billion data points. This data is explorable on 3RWW's [Calibrated Radar Rainfall website](http://www.3riverswetweather.org/municipalities/calibrated-radar-rainfall-data).

The *Teragon Rainfall Dataset API 1.0* provides direct access to the *"historic"* rainfall data (older than 60 days from today) for the physical rain gauge and calibrated "pixel" virtual rain gauge data. There are two RPC calls that allow access to each respective dataset.

*Note: For a walk-through for using this API, see this [notebook on GitHub](https://github.com/3rww/notebooks/blob/master/rainfall/Getting%20Data%20(Teragon).ipynb) (or with [NBViewer](https://nbviewer.jupyter.org/github/3rww/notebooks/blob/master/rainfall/Getting%20Data%20%28Teragon%29.ipynb))*

### Get Calibrated Radar Rainfall Data

Get virtual rain gauge (gauge-adjusted / calibrated radar) data. 

The results are returned as plain text, formated as a `csv` table (MIME-type `text\csv`').

In addition to rainfall values (as inches), each virtual gauge includes a metadata column which indicates the source for the data. This column includes the codes:

|Metadata Column Source Code | Description|
|--- |--- |
|R|Calibrated radar rainfall data|
|G-0|No gauge or calibrated radar rainfall data is available, but not for the reasons given for N/D below|
|G-1|Derived from inverse distance squared weighting based on one rain gauge|
|G-2|Derived from inverse distance squared weighting based on two rain gauges|
|G-3|Derived from inverse distance squared weighting based on three rain gauges|
|N/D|No data was collected for this data point. This may be because no data was collected at the time or the pixel may be outside of the data collection boundary.|

(Note that no metadata is provided for hourly or daily roll-ups, only 15-minute interval observations.)

Dates and times are returned using in the ISO-8601 standard timstamp format with a timezone offset for local time.

```endpoint
POST http://web.3riverswetweather.org/trp:API.pixel
```

Request Parameter | Description
---|---
`pixels` | semicolon-separated list of pixel tuples in the format "x,y" - for example: `"135,142;135,143;135,144"`. Please refer to the maps contained on the website to ﬁnd exact pixel coordinates.
`startyear` | numerical quantity in the range [2000-2030]
`startmonth` | numerical quantity in the range [1-12]
`startday` | numerical quantity in the range [1-31]
`starthour` | (optional) numerical quantity in the range [0-23]
`endyear` | numerical quantity in the range [2000-2030]
`endmonth` | numerical quantity in the range [1-12]
`endday` | numerical quantity in the range [1-31]
`endhour` | (optional) numerical quantity in the range [0-23]
`interval` | (optional) may be speciﬁed as `Hourly` or `Daily` for summary output. Absence of the parameter or any other speciﬁed parameter value will default to the 15-minute individual output 

#### Example request

```curl
curl -d zeroﬁll=yes -d interval=Hourly -d startyear=2004 -d startmonth=9 -d startday=17 -d starthour=3 -d endyear=2004 -d endmonth=9 -d endday=18 -d endhour=0 -d pixels="135,142;135,143;135,144" http://web.3riverswetweather.org/trp:API.pixel
```

```python
# using the requests library (`pip install requests`)
import requests

response = requests.post(
    "http://web.3riverswetweather.org/trp:API.pixel",
    data={
        "pixels": "135,142;135,143;135,144",
        "startmonth": 9,
        "startday": 17,
        "startyear": 2004,
        "starthour": 3,
        "endmonth": 9,
        "endday": 18,
        "endyear": 2004,
        "endhour": 0,
        "interval": "Hourly",
        "zerofill": "yes"
    }
)

print(response.text)
```

#### Example response

```html
Timestamp,135142,135142-src,135143,135143-src,135144,135144-src
2004-09-17T03:00:00,0.0070,-,0.0080,-,0.0100,-
2004-09-17T04:00:00,0.0460,-,0.0430,-,0.0510,-
2004-09-17T05:00:00,0.0110,-,0.0110,-,0.0100,-
2004-09-17T06:00:00,0.0570,-,0.0490,-,0.0480,-
2004-09-17T07:00:00,0.1970,-,0.1510,-,0.1460,-
2004-09-17T08:00:00,0.1170,-,0.1040,-,0.1140,-
2004-09-17T09:00:00,0.1940,-,0.1790,-,0.1959,-
2004-09-17T10:00:00,0.4080,-,0.3689,-,0.3710,-
2004-09-17T11:00:00,0.2880,-,0.4470,-,0.4020,-
2004-09-17T12:00:00,0.3380,-,0.5070,-,0.5828,-
2004-09-17T13:00:00,0.9820,-,1.1480,-,1.8210,-
2004-09-17T14:00:00,0.8500,-,0.8210,-,0.9450,-
2004-09-17T15:00:00,0.8009,-,0.7909,-,0.7660,-
2004-09-17T16:00:00,0.7270,-,0.7570,-,0.6430,-
2004-09-17T17:00:00,0.3890,-,0.4010,-,0.3740,-
2004-09-17T18:00:00,0.2380,-,0.2319,-,0.2250,-
2004-09-17T19:00:00,0.2210,-,0.1969,-,0.1730,-
2004-09-17T20:00:00,0.0880,-,0.0810,-,0.0720,-
2004-09-17T21:00:00,0.2330,-,0.2269,-,0.2390,-
2004-09-17T22:00:00,0.2850,-,0.2360,-,0.2730,-
2004-09-17T23:00:00,0.3220,-,0.3169,-,0.3249,-
```

### Get Rain Gauge Data

Get physical rain gauge data. The data is returned as plain text, formated as `csv` (MIME-type `text\csv`'). Dates and times are returned using in the ISO-8601 standard timstamp format with a timezone offset for local time.

```endpoint
POST http://web.3riverswetweather.org/trp:API.raingauge
```

Request Parameter | Description
---|---
`gauges` | comma-separated list of gauge numbers in the range [1-34]. Please refer to the maps contained on the website to ﬁnd gauge IDs.
`startyear` | numerical quantity in the range [2000-2030]
`startmonth` | numerical quantity in the range [1-12]
`startday` | numerical quantity in the range [1-31]
`starthour` | numerical quantity in the range [0-23]
`endyear` | numerical quantity in the range [2000-2030]
`endmonth` | numerical quantity in the range [1-12]
`endday` | numerical quantity in the range [1-31]
`endhour` | numerical quantity in the range [0-23]
`interval` | (optional) may be speciﬁed as `Hourly` or `Daily` for summary output. Absence of the parameter or any other speciﬁed parameter value will default to the 15-minute individual output 

#### Example request

```curl
curl -d zeroﬁll=yes -d interval=Hourly -d startyear=2004 -d startmonth=9 -d startday=17 -d starthour=3 -d endyear=2004 -d endmonth=9 -d endday=18 -d endhour=0 -d gauges="1,2" http://web.3riverswetweather.org/trp:API.raingauge
```

```python
import requests

requests.post(
    "http://web.3riverswetweather.org/trp:API.raingauge",
    data={
        "gauges": "1,2",
        "startmonth": 9,
        "startday": 17,
        "startyear": 2004,
        "starthour": 3,
        "endmonth": 9,
        "endday": 18,
        "endyear": 2004,
        "endhour": 0,
        "interval": "Hourly",
        "zerofill": "yes"
    }
)

print(requests.text)
```

#### Example response

```html
Timestamp,1,1-src,2,2-src
2004-09-17T03:00:00,0.0000,-,0.0000,-
2004-09-17T04:00:00,0.0200,-,0.0200,-
2004-09-17T05:00:00,0.0200,-,0.0100,-
2004-09-17T06:00:00,0.0200,-,0.0400,-
2004-09-17T07:00:00,0.1200,-,0.1100,-
2004-09-17T08:00:00,0.1000,-,0.1100,-
2004-09-17T09:00:00,0.1200,-,0.1300,-
2004-09-17T10:00:00,0.3000,-,0.3000,-
2004-09-17T11:00:00,0.3500,-,0.3300,-
2004-09-17T12:00:00,0.5000,-,0.5500,-
2004-09-17T13:00:00,1.0300,-,0.8900,-
2004-09-17T14:00:00,1.0200,-,0.9500,-
2004-09-17T15:00:00,0.6600,-,0.6700,-
2004-09-17T16:00:00,0.5100,-,0.6200,-
2004-09-17T17:00:00,0.2700,-,0.3100,-
2004-09-17T18:00:00,0.1300,-,0.1500,-
2004-09-17T19:00:00,0.1400,-,0.1300,-
2004-09-17T20:00:00,0.0700,-,0.0600,-
2004-09-17T21:00:00,0.1000,-,0.0700,-
2004-09-17T22:00:00,0.2300,-,0.2700,-
2004-09-17T23:00:00,0.1600,-,0.1500,-
```