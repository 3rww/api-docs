## Delineation API

The Delineation API provides surficial delineation of drainage basins, with coverage for Allegheny County.

### Delineate

Delineate the upstream contributing area from a point or area.

```endpoint
GET http://api.3riverswetweather.org/api/v0/delineation/delineate
```

### Delineate and Cross-Tab

Delineate the upstream contributing area from a point or area *and* cross-tabulate the resulting area with data sets for the area, e.g., landcover, topographic, and sub-surface characteristics.

By default, return the delineation area (as a `GeoJSON` polygon) with cross-tabulated statistics included as properties.

```endpoint
GET http://api.3riverswetweather.org/api/v0/delineation/delineate-crosstab
```

### Cross-Tab (BYO Delineation)

Bring your own area of interest (presumably representing a delineation you've created on your own, but really you can supply whatever area suits your fancy) and cross-tabulate it with data sets for the area, e.g., landcover, topographic, and sub-surface characteristics.

```endpoint
GET http://api.3riverswetweather.org/api/v0/delineation/crosstab
```