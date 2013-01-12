# clean-or-dirty.com

Mobile web app, keep track of dishwasher status using location.

## Directories

* `app` source files
* `dist` build for production
* `api` deployd source
* `test` unit tests

## API

### Appliances Collection

#### [GET] 

##### Existing location

**Request**

    /appliances?{"ref": "9e30ef6c90ffc7c5e650e63eb078174b"}

**Response**

	[
	    {
	        "created": "Sun Jan 06 2013 08:40:08 GMT+0000 (UTC)", 
	        "id": "ffbf4189d3ba6bee", 
	        "name": "1431", 
	        "ref": "9e30ef6c90ffc7c5e650e63eb078174b", 
	        "state": "Dirty", 
	        "updated": "Sun Jan 06 2013 08:40:49 GMT+0000 (UTC)"
	    }
	]

##### New location

**Request**

    /appliances?{"ref": "9e30ef6c90ffc7c5e650e63eb078174b"}

**Response**

	[]

#### [POST] 

##### New location

**Request**

    /appliances

Body

	{"ref":"9e30ef6c90ffc7c5e650e63eb078174b","state":"Clean"}

**Response**

	{
	    "created": "Sat Jan 12 2013 21:24:50 GMT+0000 (UTC)", 
	    "id": "2c3c2a82207b984e", 
	    "ref": "9e30ef6c90ffc7c5e650e63eb078174b", 
	    "state": "Clean", 
	    "updated": "Sat Jan 12 2013 21:24:50 GMT+0000 (UTC)"
	}


#### [PUT] 

##### Existing location

Update as *Clean* appliance.

**Request**

    /appliances/ffbf4189d3ba6bee

Body

	{
	    "created": "Sun Jan 06 2013 08:40:08 GMT+0000 (UTC)", 
	    "id": "ffbf4189d3ba6bee", 
	    "name": "1431", 
	    "ref": "9e30ef6c90ffc7c5e650e63eb078174b", 
	    "state": "Clean", 
	    "updated": "Sun Jan 06 2013 08:40:49 GMT+0000 (UTC)"
	}

**Response**

	{
	    "id": "ffbf4189d3ba6bee", 
	    "name": "1431", 
	    "ref": "9e30ef6c90ffc7c5e650e63eb078174b", 
	    "state": "Clean", 
	    "updated": "Sat Jan 12 2013 21:19:33 GMT+0000 (UTC)"
	}

Update as *Dirty* appliance.

**Request**

	/appliances/2c3c2a82207b984e

Body

	{
	    "created": "Sat Jan 12 2013 21:24:50 GMT+0000 (UTC)", 
	    "id": "2c3c2a82207b984e", 
	    "name": "1431", 
	    "ref": "9e30ef6c90ffc7c5e650e63eb078174b", 
	    "state": "Dirty", 
	    "updated": "Sat Jan 12 2013 21:24:50 GMT+0000 (UTC)"
	}

**Response**

	{
	    "id": "2c3c2a82207b984e", 
	    "name": "1431", 
	    "ref": "9e30ef6c90ffc7c5e650e63eb078174b", 
	    "state": "Dirty", 
	    "updated": "Sat Jan 12 2013 21:29:51 GMT+0000 (UTC)"
	}
