export default {
    maxRequestsPerSecond: 2,
    /*Sets the maximum API requests per second allowed by a single wrapper instance*/
    /*Recommend setting to 2. This allows more than one wrapper instance to use the same API key in parallel,
    and allows a single instance to continue working after the request limit is reached.*/
    /*See https://help.smartsuite.com/en/articles/4856710-api-limits for more information on API limits*/
    maxBulkRequestSize: 25,
    /*Smartsuite limit the maximum number of records per bulk update request*/
    /*See https://developers.smartsuite.com/docs/category/records for more information*/
    rateLimitRetryLimit: 5,
    /*Sets the number of times the wrapper will retry a request that has
                                failed with a 429 response before throwing an error*/
    /*See https://help.smartsuite.com/en/articles/4856710-api-limits for more information on API limits*/
    rateLimitRetryDelay: 30000,
    /*Sets the delay in milliseconds between the first and second retry for
    a request that has failed with a 429 response. The delay will be
    doubled for each subsequent retry */
    /*Recommend setting to 30000. API consumers must back off for at least 30 seconds following a 429 error.*/
    /*See https://help.smartsuite.com/en/articles/4856710-api-limits for more information on API limits*/
    serverErrorRetryLimit: 5,
    /*Sets the number of times the wrapper will retry a request that has
    failed with a response code >= 500 before throwing an error*/
    serverErrorRetryDelay: 5000,
    /*Sets the delay in milliseconds between the first and second retry for
    a request that has failed with a response code >= 500. The delay will be
    doubled for each subsequent retry*/
};
//# sourceMappingURL=default-smartsuite-config.js.map