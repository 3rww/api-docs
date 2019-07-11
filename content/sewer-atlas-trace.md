## Network Trace API

The Network Trace API provides *straightforward* access to the geoprocessing service behind the network trace tool used by the [3RWW Sewer Atlas](http://mds.3riverswetweather.org/atlas/rsi) and 3RWW's [Flush-It!](https://flush-it.civicmapper.com/) map. This API provides a way to run a network trace without having to deal with the underlying ArcGIS REST API; it provides a quick path to data that is ready for system modeling (e.g., SWMM), without the need for post-processing.

*Note: This API is currently under development; headings and addresses below represent planned endpoints.*

### Flush-It Trace

This trace endpoint provides summary results similar to those seen in 3RWW's [Flush-It!](https://flush-it.civicmapper.com/) map.

Using a Street Address or X/Y coordinates, get a summary of the sewer network downstream *and* upstream. Summary results include:

* **downstream**: distance, estimated time to plant, municipalities and neighborhoods, and the path of the downstream trace.
* **upstream**: distance, inch-miles, municipalities and neighborhoods

```endpoint
GET http://api.3riverswetweather.org/api/v0/networktrace/light
```

### Sewer Atlas Trace

Using a Street Address, X/Y coordinates, or a Structure ID from `struct_id` field of `sewerstormwater_nodes` feature service on the Sewer Atlas, get a summary of the sewer network downstream *and* upstream (same as Network Trace *Light*), as well as the complete geometry of the trace as `geojson` with pipe and structure attributes key to modeling.

The *Sewer Atlas* endpoint requires that 3RWW MDS credentials be submitted with the request; as such this endpoint only accepts `POST` requests.

```endpoint
POST http://api.3riverswetweather.org/api/v0/networktrace/heavy
```