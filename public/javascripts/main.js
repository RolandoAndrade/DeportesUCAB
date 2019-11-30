async function beforeEverithing()
{
	let userdata = (await new GetRequest("/api/v1/users/"+(new Cookie("user_id").getCookie())).execute()).data[0];
	$("#imagen-usuario").attr("src",userdata.imagen);
	$("#nombre-usuario").text(userdata.nombre+" "+userdata.apellido);
}
beforeEverithing();
function exitWindow()
{
	swal({
		  	title: '¿Estás seguro?',
		  	text: "La sesión actual será cerrada",
		  	type: 'warning',
		  	showCancelButton: true,
		  	confirmButtonColor: '#DC8502',
		  	cancelButtonColor: '#F44336',
		  	confirmButtonText: 'Sí, ¡quiero salir!',
		  	cancelButtonText: 'No, cancelar!'
		}).then(function () {
			window.location.href="index.html";
	});
}


$(document).ready(function(){
	$('.btn-sideBar-SubMenu').on('click', function(){
		var SubMenu=$(this).next('ul');
		var iconBtn=$(this).children('.zmdi-caret-down');
		if(SubMenu.hasClass('show-sideBar-SubMenu')){
			iconBtn.removeClass('zmdi-hc-rotate-180');
			SubMenu.removeClass('show-sideBar-SubMenu');
		}else{
			iconBtn.addClass('zmdi-hc-rotate-180');
			SubMenu.addClass('show-sideBar-SubMenu');
		}
	});
	$('.btn-exit-system').on('click', exitWindow);

	$('.exitSideBar').on('click', exitWindow);

	$('.btn-menu-dashboard').on('click', function(){
		var body=$('.dashboard-contentPage');
		var sidebar=$('.dashboard-sideBar');
		if(sidebar.css('pointer-events')=='none'){
			body.removeClass('no-paddin-left');
			sidebar.removeClass('hide-sidebar').addClass('show-sidebar');
		}else{
			body.addClass('no-paddin-left');
			sidebar.addClass('hide-sidebar').removeClass('show-sidebar');
		}
	});
	$('.btn-Notifications-area').on('click', function(){
		var NotificationsArea=$('.Notifications-area');
		if(NotificationsArea.css('opacity')=="0"){
			NotificationsArea.addClass('show-Notification-area');
		}else{
			NotificationsArea.removeClass('show-Notification-area');
		}
	});
	$('.btn-search').on('click', function(){
		swal({
		  title: 'En este momento no tienes órdenes de recolección',
		  confirmButtonText: '<i class="zmdi zmdi-check"></i>  Ok',
		  confirmButtonColor: '#03A9F4',
		  showCancelButton: true,
		  cancelButtonColor: '#F44336',
		  cancelButtonText: '<i class="zmdi zmdi-close-circle"></i> Cancel',
		  html: '<div class="form-group label-floating">'+
			  		'<label class="control-label" for="InputSearch">write here</label>'+
			  		'<input class="form-control" id="InputSearch" type="text">'+
				'</div>'
		}).then(function () {
		  swal(
		    'You wrote',
		    ''+$('#InputSearch').val()+'',
		    'success'
		  )
		});
	});
	$('.btn-modal-help').on('click', function(){
		$('#Dialog-Help').modal('show');
	});

	$('.viewSideBar').on('click', function() 
	{
		$('.nameofsection').text("ÓRDENES DE RECOLECCIÓN");
		$('.makeACollectionOrder').hide(300);
		$('#map').show(300);
	});

	$('.collectionOrderSideBar').on('click', function() 
	{
		$('.nameofsection').text("CREAR ORDEN DE RECOLECCIÓN");
		$('#map').hide(300);
		$('.makeACollectionOrder').show(300);
	});

	$('.fecha-input').datepicker({firstDay:1, format: 'yyyy-mm-dd', i18n:{cancel: "Cancelar", months: [
				'Enero',
				'Febrero',
				'Marzo',
				'Abril',
				'Mayo',
				'Junio',
				'Julio',
				'Agosto',
				'Septiembre',
				'Octubre',
				'Noviembre',
				'Diciembre'
			], monthsShort:
				[
					'Ene',
					'Feb',
					'Mar',
					'Abr',
					'May',
					'Jun',
					'Jul',
					'Ago',
					'Sep',
					'Oct',
					'Nov',
					'Dic'
				], weekdays: [
				'Domingo',
				'Lunes',
				'Martes',
				'Miércoles',
				'Jueves',
				'Viernes',
				'Sábado'
			], weekdaysShort: [
				'Dom',
				'Lun',
				'Mar',
				'Mié',
				'Jue',
				'Vie',
				'Sáb'
			], weekdaysAbbrev: ['D','L','M','X','J','V','S'],

		}});

	M.updateTextFields();

	$('select').formSelect();

	$(".cover-loader").removeClass("show");

});

(function($){
    $(window).on("load",function(){
        $(".dashboard-sideBar-ct").mCustomScrollbar({
        	theme:"dark-thick",
        	scrollbarPosition: "inside",
        	autoHideScrollbar: true,
        	scrollButtons: {enable: true},
			mouseWheelPixels: 100
        });
        $(".dashboard-contentPage, .Notifications-body").mCustomScrollbar({
        	theme:"dark-thick",
        	scrollbarPosition: "inside",
        	autoHideScrollbar: true,
        	scrollButtons: {enable: true},
			scrollInertia: 200,
        });
    });

})(jQuery);



function changeViewTo(view)
{
	if(($("#inicio").hasClass("selected")&&view.id==="inicio")
        ||($("#partidos").hasClass("selected")&&view.id==="partidos")
        ||($("#clasificacion").hasClass("selected")&&view.id==="clasificacion"))
	{
	    return;

	}
    $('#header-detail').find(".selected").removeClass("selected");
    $('#inicio-content').hide(300);
    $('#partidos-content').hide(300);
    $('#clasificacion-content').hide(300);
    $('#estadisticas-content').hide(300);

	$("#"+view.id+"-content").show(300);
	view.classList.add("selected");
}


function backLevel(all=false)
{
	let url = document.location.href;
	url = all?url.split("#")[0]:url.substring(0,url.lastIndexOf("#"));
	window.history.pushState('DeportesUCAB', 'DeportesUCAB', url);
	if(all)
	{
		showInicio()
	}
}

function backToLast()
{
	backLevel();
	viewSelection();
}

function replaceIcon(icon)
{
	$(".detail-exit").find(".show").removeClass("show");
	$("#"+icon).addClass("show");
}

function hideAll()
{
    $("#eventos-content").hide(300);
    $("#competition-detail").hide(300);
	$("#creador-content").hide(300);
    $("#creador-partidos-content").hide(300);
	$("#creador-fases-content").hide(300);
}



async function showInicio()
{
	hideAll();
	$("#eventos-content").show(300);
	$("#detail-title").html("Inicio");
	replaceIcon("inicio-icon");
	let a = await new EventDAO().getAll();
	addEvents(a.data);
}

function viewSelection(auxiliar)
{
	let url = document.location.href;
	url = url.substring(url.lastIndexOf("#"));
	if(url.indexOf("#")===-1)
	{
		showInicio();
	}
	else if(url.indexOf("#detalles?=")!==-1)
	{
		showCompetitionDetail(auxiliar);
	}
	else if(url.indexOf("#crear-competicion")!==-1)
	{
		showCreador();
	}
	else if(url.indexOf("#crear-partidos")!==-1)
	{
		showCrearPartidos();
	}
	else if(url.indexOf("#crear-fases")!==-1)
	{
		showFaseador();
	}
	else
	{
        showInicio();
	}
}

viewSelection();