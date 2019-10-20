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
	if(!$("#inicio").hasClass("selected")||view.id!=="inicio")
	{
		$('#inicio-content').hide(300);
		$("#inicio").removeClass("selected");
	}
	if(!$("#partidos").hasClass("selected")||view.id!=="partidos")
	{
		$('#partidos-content').hide(300);
		$("#partidos").removeClass("selected");
	}
	if(!$("#clasificacion").hasClass("selected")||view.id!=="clasificacion")
	{
		$('#clasificacion-content').hide(300);
		$("#clasificacion").removeClass("selected");
	}


	$("#"+view.id+"-content").show(300);
	view.classList.add("selected");
}

let lastPage = undefined;
let currentSubView = undefined;
let lastContainerToHide = undefined;

function openDetailsOf(containerToShow, containerToHide, lastTitle, newTitle)
{
    $("#"+containerToHide).hide(300);
    $("#"+containerToShow).show(300);
    lastPage = lastTitle;
    window.history.pushState('page2', 'DeportesUCAB', '#'+newTitle);
    $("#detail-title").html(newTitle);
    $(".detail-exit").find(".show").removeClass("show");
    $("#back-icon").addClass("show");
}

function backToLast()
{
    if (lastPage)
    {
        $("#back-icon").removeClass("show");
        $("#"+lastPage.toLowerCase()+"-icon").removeClass("show");
        $("#detail-title").html(lastPage);
        lastPage = undefined;
    }
}
