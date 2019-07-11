## Rainfall API (via Teragon)

3 Rivers Wet Weather, with support from [Vieux Associates](http://www.vieuxinc.com/), uses calibrated data from the NEXRAD radar located in Moon Township, PA with rain gauge measurements collected during the same time period and rain event for every square kilometer in Allegheny County. The resulting rainfall data is equivalent in accuracy to having 2,276 rain gauges placed across the County. 3RWW has a massive repository of this high resolution spatiotemporal calibrated radar rainfall data for Allegheny County dating back to 2000 and including nearly 2 billion data points. This data is explorable on 3RWW's [Calibrated Radar Rainfall website](http://www.3riverswetweather.org/municipalities/calibrated-radar-rainfall-data).

The *Teragon Rainfall Dataset API 1.0* provides direct access to the *"historic"* rainfall data (older than 60 days from today) for the physical rain gauge and calibrated "pixel" virtual rain gauge data. There are two RPC calls that allow access to each respective dataset.

*Note: For an in-depth walk-through for using this API, see this [notebook on GitHub](https://github.com/3rww/notebooks/blob/master/rainfall/Getting%20Data%20(Teragon).ipynb) (or with [NBViewer](https://nbviewer.jupyter.org/github/3rww/notebooks/blob/master/rainfall/Getting%20Data%20%28Teragon%29.ipynb))*

### Get Calibrated Radar Rainfall Data

Get calibrated "pixel" virtual rain gauge data. The data is returned as plain text, formated as `csv`.

```endpoint
POST http://web.3riverswetweather.org/trp:API.pixel
```

Property | Description
---|---
`pixels` | semicolon-separated list of pixel tuples in the format "x,y" - for example: `"135,142;135,143;135,144"`. Please refer to the maps contained on the website to ﬁnd exact pixel coordinates.
`startyear` | numerical quantity in the range [2000-2030]
`startmonth` | numerical quantity in the range [1-12]
`startday` | numerical quantity in the range [1-31]
`starthour` | numerical quantity in the range [0-23]
`endyear` | numerical quantity in the range [2000-2030]
`endmonth` | numerical quantity in the range [1-12]
`endday` | numerical quantity in the range [1-31]
`endhour` | numerical quantity in the range [0-23]
`interval` | (optional) may be speciﬁed as `Hourly` or `Daily` for summary output. Absence of the parameter or any other speciﬁed parameter value will default to the 15-minute individual output 
`zeroﬁll` | (optional) a value of `yes` will cause all rows to be included (normally rows that contain zeros for all datapoints are omitted)

#### Example request

```curl
curl -d zeroﬁll=yes -d interval=Hourly -d startyear=2004 -d startmonth=9 -d startday=17 -d starthour=3 -d endyear=2004 -d endmonth=9 -d endday=18 -d endhour=0 -d "pixels=135,142;135,143;135,144" http://web.3riverswetweather.org/trp:API.pixel
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
Timestamp,135-142,,135-143,,135-144,
2004/09/17 03:00:00,0.0070,-,0.0080,-,0.0100,-
2004/09/17 04:00:00,0.0460,-,0.0430,-,0.0510,-
2004/09/17 05:00:00,0.0110,-,0.0110,-,0.0100,-
2004/09/17 06:00:00,0.0570,-,0.0490,-,0.0480,-
2004/09/17 07:00:00,0.1970,-,0.1510,-,0.1460,-
2004/09/17 08:00:00,0.1170,-,0.1040,-,0.1140,-
2004/09/17 09:00:00,0.1940,-,0.1790,-,0.1959,-
2004/09/17 10:00:00,0.4080,-,0.3689,-,0.3710,-
2004/09/17 11:00:00,0.2880,-,0.4470,-,0.4020,-
2004/09/17 12:00:00,0.3380,-,0.5070,-,0.5828,-
2004/09/17 13:00:00,0.9820,-,1.1480,-,1.8210,-
2004/09/17 14:00:00,0.8500,-,0.8210,-,0.9450,-
2004/09/17 15:00:00,0.8009,-,0.7909,-,0.7660,-
2004/09/17 16:00:00,0.7270,-,0.7570,-,0.6430,-
2004/09/17 17:00:00,0.3890,-,0.4010,-,0.3740,-
2004/09/17 18:00:00,0.2380,-,0.2319,-,0.2250,-
2004/09/17 19:00:00,0.2210,-,0.1969,-,0.1730,-
2004/09/17 20:00:00,0.0880,-,0.0810,-,0.0720,-
2004/09/17 21:00:00,0.2330,-,0.2269,-,0.2390,-
2004/09/17 22:00:00,0.2850,-,0.2360,-,0.2730,-
2004/09/17 23:00:00,0.3220,-,0.3169,-,0.3249,-
TOTAL,6.7989,,7.0754,,7.7866,
```

### Get Rain Gauge Data

Get physical rain gauge data. The data is returned as plain text, formated as `csv`.

```endpoint
POST http://web.3riverswetweather.org/trp:API.raingauge
```

Property | Description
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
`zeroﬁll` | (optional) a value of `yes` will cause all rows to be included (normally rows that contain zeros for all datapoints are omitted)

#### Example request

```curl
curl -d zeroﬁll=yes -d interval=Hourly -d startyear=2004 -d startmonth=9 -d startday=17 -d starthour=3 -d endyear=2004 -d endmonth=9 -d endday=18 -d endhour=0 -d "gauges=1,2" http://web.3riverswetweather.org/trp:API.raingauge
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
Timestamp,1,,2,
2004/09/17 03:00:00,0.0000,-,0.0000,-
2004/09/17 04:00:00,0.0200,-,0.0200,-
2004/09/17 05:00:00,0.0200,-,0.0100,-
2004/09/17 06:00:00,0.0200,-,0.0400,-
2004/09/17 07:00:00,0.1200,-,0.1100,-
2004/09/17 08:00:00,0.1000,-,0.1100,-
2004/09/17 09:00:00,0.1200,-,0.1300,-
2004/09/17 10:00:00,0.3000,-,0.3000,-
2004/09/17 11:00:00,0.3500,-,0.3300,-
2004/09/17 12:00:00,0.5000,-,0.5500,-
2004/09/17 13:00:00,1.0300,-,0.8900,-
2004/09/17 14:00:00,1.0200,-,0.9500,-
2004/09/17 15:00:00,0.6600,-,0.6700,-
2004/09/17 16:00:00,0.5100,-,0.6200,-
2004/09/17 17:00:00,0.2700,-,0.3100,-
2004/09/17 18:00:00,0.1300,-,0.1500,-
2004/09/17 19:00:00,0.1400,-,0.1300,-
2004/09/17 20:00:00,0.0700,-,0.0600,-
2004/09/17 21:00:00,0.1000,-,0.0700,-
2004/09/17 22:00:00,0.2300,-,0.2700,-
2004/09/17 23:00:00,0.1600,-,0.1500,-
TOTAL,5.8700,,5.8700,
```