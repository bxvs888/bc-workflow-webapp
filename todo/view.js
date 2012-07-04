bc.namespace("bc.todoView");
bc.todoView = {
	init : function() {
		var $page = $(this);
	},
	
	signTask : function (){
		var $page = $(this);
		// 获取用户选中的条目
		var ids = bc.grid.getSelected($page.find(".bc-grid"));
		// 检测是否选中条目
		if(ids.length ==0){
			bc.msg.slide("请先选择要签领的信息！");
			return;
		}else if(ids.length == 1){
			// 检测是否已有签领记录，没有才允许继续签领，避免重复签领
			jQuery.ajax({
				url: bc.root + "/bc-workflow/todo/personals/claimTask", 
				data: {excludeId: ids[0]}, 
				dataType: "json",
				success: function(json) {
					// 如果已经签领过就提示用户
					if(json.signed == "true"){
						bc.msg.alert('此任务已经签领.');
					}else{
						bc.msg.confirm("确定签领此任务吗？",function(){
							jQuery.ajax({
								url: bc.root + "/bc-workflow/todo/personals/doSignTask", 
								data: {excludeId: ids[0]},
								dataType: "json",
								success: function(json) {
									bc.msg.slide(json.msg);
									bc.grid.reloadData($page);
								}
							});
						});
						return;
					}
				}
			});

		}else{
			bc.msg.slide("一次只能选择一条任务签领！");
		}
	},
	
	open : function (){
		var $page = $(this);
		// 获取用户选中的条目
		var ids = bc.grid.getSelected($page.find(".bc-grid"));
		bc.page.newWin({
			name: "我的工作空间",
			mid: "openWorkspace",
			url: bc.root+ "/bc-workflow/workspace/open",
			data: {id: ids[0]}, 
			afterClose: function(status){
				if(status) bc.grid.reloadData($page);
			}
		});
	}
};
