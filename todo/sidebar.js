bc.namespace("bc.sidebar");
bc.sidebar.todo = {
	init : function() {
		var $page = $(this);
		
		$page.find('.more').click(function(){
			bc.page.newWin({
				name: "我的待办",
				mid: "personals",
				url: bc.root+ "/bc-workflow/todo/personals/list",
			});
		});
		
		$page.delegate(".task",{
			click: function(e) {
				var $target = $(e.target);
				var $this = $(this);
				if($target.is(".toggle")){// 折叠或展开当前任务
					$this.toggleClass("collapse");
					$target.toggleClass("ui-icon-carat-1-se ui-icon-carat-1-nw");
				}else if($target.is(".group")){// 领取任务
					alert("TODO:领取任务");				
				}else if($target.is(".name")){// 打开任务
					alert("TODO:打开任务");				
				}
				return false;
			}
		});
	}
};
