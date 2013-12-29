INSTALLER = function(frapp) {
	FRAPP.setTitle(L.installing + ' ' + frapp.name + '...');

	/* Render Installer UI */
	$('body').append(Handlebars.templates.installer({
		frapp : frapp
	}));
};

UPDATER = function(frapps) {
	var pendingUpdates = L.pendingUpdates.replace(/%d/, frapps.length);
	FRAPP.setTitle(pendingUpdates);
	
	/* Render Installer UI */
	var body = $('body');
	body.css('overflow', 'hidden').append(Handlebars.templates.updater({
		frapps : frapps,
		pendingUpdates : pendingUpdates
	}));

	frapps = JSON.parse(JSON.stringify(frapps));
	$('button.update').click(function() {
		$(this).prop('disabled', true);
		var update = function() {
				if(!frapps.length) return FRAPP.close();
				var frapp = frapps.shift();
				FRAPP.update(frapp, function() {
					$('table tbody tr').first().fadeOut('fast', function() {
						$(this).remove();
						update();
					});
				});
			};

		update();
	});

	window.resizeTo(500, Math.min(body[0].scrollHeight + 22, 500));
	body.css('overflow', '');
};

window.addEventListener('frapp.init', function(e) {
	/* Handlebars helpers */
	Handlebars.registerHelper('i', function(className) {
		return new Handlebars.SafeString('<span class="glyphicon glyphicon-' + className + '"></span>');
	});

	/* Process params */
	var params = e.detail.params;
	if(!params || (!params.install && !params.updates)) return FRAPP.close();
	params.install && INSTALLER(params.install);
	params.updates && UPDATER(params.updates);
});
