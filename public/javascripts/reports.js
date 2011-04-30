/**
 * @author marcodeseri
 */


var dashReport_visits = {
  metrics: ['ga:visits','ga:bounces'],
  dimension:'ga:date',
  hourDimension:'ga:hour',
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'dashVisits',
  reportType: 'LINECHART',
  title: 'Visits',
  dimensionTitle: 'Date',
  dimensionHourTitle: 'Hour',
  metricsTitle:['Visits','Bounces'],
  phoneSize: '300x200',
  tabletSize: '450x270',
  sortColumn: 0,
  options: '&cht=lc&chxt=x,y&showAxisLines=false&chco=0077cc,ff9900&chm=o,0077cc,0,-1,8.0&chls=5|3,6,3&chma&10,10,10,10'
  
}

var dashSmallChartOpts = '&cht=ls&showAxisLines=false&chco=0077cc&chm=o,0077cc,0,-1,5.5&chls=3&chma=5,5,5,5&chts=000000,9'


var dashReport_basics = {
	metrics: ['ga:pageviewsPerVisit', 'ga:visitBounceRate','ga:avgTimeOnSite', 'ga:goalCompletionsAll'],
  	reportType: 'TEXT',
  	metricsTitle:['Pageviews per Visit','Bounce Rate', 'Time On Site', 'Goals'],
  	metricsFormatting:['dec','perc', 'time', 'none'],
  	textTarget:['dashPageviews','dashBounces', 'dashTime', 'dashGoals']
}

var acquisitionReport = {
	metrics: ['ga:visits'],
	dimension:'ga:medium',
	sort: 'ga:visits',
	results: '5',
	chartTarget: 'acquisitionChart',
	tableTarget: 'acquisitionTable',
	reportType: 'PIE',
	title: 'Visitor Type',
	dimensionTitle: 'Medium',
	metricsTitle:['Visits'],
    sortColumn: 1,
    phoneSize: '315x150',
	tabletSize: '450x270',
	sortColumn: 0,
    options: '&cht=p3&chco=0077cc'	
};

var acquisitionReport_keyword = {
  metrics: ['ga:visits'],
  dimension:'ga:keyword',
  sort: 'ga:visits',
  results: '10',
  tableTarget: 'acquisitionChart',
  reportType: 'PIE',
  title: 'Keyword Type',
  dimensionTitle: 'Keyword',
  metricsTitle:['Visits'],
  sortColumn: 1
  
};

var acquisitionReport_referrer = {
  metrics: ['ga:visits'],
  dimension:'ga:source',
  sort: 'ga:visits',
  results: '10',
  tableTarget: 'acquisitionChart',
  reportType: 'PIE',
  title: 'Source',
  dimensionTitle: 'Source',
  metricsTitle:['Visits'],
  sortColumn: 1
  
};

var outcomesReport = {
	metrics: ['ga:goalCompletionsAll'],
	dimension:'ga:date',
	hourDimension:'ga:hour',
	sort: 'ga:date',
	hourSort:'ga:hour',
	results: '24',
	chartTarget: 'outcomesChart',
	reportType: 'LINECHART',
	title: 'Goals Trend',
	dimensionTitle: 'Date',
	metricsTitle:['Goals'],
  	sortColumn: 0,
  	phoneSize: '300x200',
	tabletSize: '450x270',
  	options: '&cht=lc&chxt=x,y&showAxisLines=false&chco=0077cc,ff9900&chm=o,0077cc,0,-1,8.0&chls=5|3,6,3&chma&10,10,10,10'
   
};

var outcomesReport_commerce = {
  metrics: ['ga:itemRevenue','ga:transactions'],
  dimension:'ga:date',
  hourDimension:'ga:hour',
  sort: 'ga:date',
  hourSort:'ga:hour',
  results: '24',
  chartTarget: 'outcomesChart',
  reportType: 'LINECHART',
  title: 'Revenue',
  dimensionTitle: 'Date',
  metricsTitle:['Revenue','Transactions'],
  sortColumn: 0,
  phoneSize: '300x200',
  tabletSize: '450x270',
  options: '&cht=lc&chxt=x,y&showAxisLines=false&chco=0077cc,ff9900&chm=o,0077cc,0,-1,8.0&chls=5|3,6,3&chma&10,10,10,10'
   
};


var countryReport = {
  metrics: ['ga:visits'],
  dimension:'ga:country',
  sort: 'ga:visits',
  results: '50',
  tableTarget: 'countryTable',
  reportType: 'MAP',
  title: 'Map Overlay',
  dimensionTitle: 'Country',
  metricsTitle:['Visits'],
  sortColumn: 1
  
}

var countryReport_cities = {
  metrics: ['ga:visits'],
  dimension:'ga:city',
  sort: 'ga:visits',
  results: '50',
  tableTarget: 'countryTable',
  reportType: 'MAP',
  title: 'Map Overlay',
  dimensionTitle: 'Country',
  metricsTitle:['Visits'],
  sortColumn: 1
  
}