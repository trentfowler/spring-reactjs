/**
 * Configures rest.js to include support for HAL, URI Templates, and other
 * things. Also sets the default Accept request header to
 * application/hal+json.
 *
 * Custom code source: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 */

'use strict';

var rest = require('rest');
var defaultRequest = require('rest/interceptor/defaultRequest');
var mime = require('rest/interceptor/mime');
var uriTemplateInterceptor = require('./api/uriTemplateInterceptor');
var errorCode = require('rest/interceptor/errorCode');
var baseRegistry = require('rest/mime/registry');

var registry = baseRegistry.child();

registry.register('text/uri-list', require('./api/uriListConverter'));
registry.register('application/hal+json', require('rest/mime/type/application/hal'));

module.exports = rest
		.wrap(mime, { registry: registry })
		.wrap(uriTemplateInterceptor)
		.wrap(errorCode)
		.wrap(defaultRequest, { headers: { 'Accept': 'application/hal+json' }});

