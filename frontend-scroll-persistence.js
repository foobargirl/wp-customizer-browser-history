/* global _ */
/* eslint no-magic-numbers: ["error", { "ignore": [0,1] }] */
jQuery( function( $ ) {
	'use strict';
	var customizeLink, $window, updateScrollParam;
	customizeLink = $( '#wp-admin-bar-customize > a' );
	$window = $( window );

	updateScrollParam = function() {
		var query = customizeLink.prop( 'search' ).substr( 1 );

		// Remove existing scroll param.
		query = _.filter( query.split( /&/ ), function( pair ) {
			return ! /^scroll=/.test( pair );
		}).join( '&' );

		// Append new scroll param to query string.
		if ( query.length > 0 ) {
			query += '&';
		}
		query += 'scroll=' + String( $window.scrollTop() );

		// Update query string.
		customizeLink.prop( 'search', query );
	};

	// Restore the scroll position the user was last at in the Customizer preview.
	if ( 'undefined' !== typeof sessionStorage && sessionStorage.getItem( 'lastCustomizerScrollPosition' ) ) {
		$window.scrollTop( parseInt( sessionStorage.getItem( 'lastCustomizerScrollPosition' ), 10 ) );
		sessionStorage.removeItem( 'lastCustomizerScrollPosition' );
	}

	customizeLink.on( 'mouseover mousedown click', updateScrollParam );
});
