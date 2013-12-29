window.addEventListener('frapp.init', function(e) {
	if(!e.detail.params || !e.detail.params.repo) return FRAPP.close();
	var frapp = e.detail.params.repo;
	
	FRAPP.setTitle(L.installing + ' ' + frapp.name + '...');

	/* Render Installer UI */
	$('body').append(Handlebars.templates.installer({
		frapp : frapp
	}));
});
