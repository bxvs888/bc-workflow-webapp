bc.namespace("bc.deploy");
bc.deploy = {
	init : function() {
		var $page = $(this);
	},
	
	release : function (){
		
		var $page = $(this);
		// 获取用户选中的条目
		var ids = bc.grid.getSelected($page.find(".bc-grid"));
		
		//定义函数
		function releaseInfo(){ 
			
			//获取选中的行
			var $tr = $page.find(".bc-grid>.data>.right tr.ui-state-highlight");
			var $hidden = $tr.data("hidden");
			
			var subject = $hidden.subject; //标题
			var source = $hidden.source; //原始文件名称
			var type = $hidden.type; //0:XML,1:BAR
			var path = $hidden.path; //0:XML,1:BAR
			
			jQuery.ajax({
				url: bc.root + "/bc-workflow/deploys/deployRelease", 
				data: {
					excludeId: ids[0],
					subject: subject,
					source: source,
					type:type,
					path:path
				},
				dataType: "json",
				success: function(json) {
					bc.msg.slide(json.msg);
					bc.grid.reloadData($page);
				}
			});
			return;
		}
		
		// 检测是否选中条目
		if(ids.length ==0){
			bc.msg.slide("请先选择要发布的信息！");
			return;
		}else if(ids.length == 1){
			// 检测是否已发布记录，如有需重新发布提示.
			jQuery.ajax({
				url: bc.root + "/bc-workflow/deploys/isReleased", 
				data: {excludeId: ids[0]}, 
				dataType: "json",
				success: function(json) {
					// 如果已经签领过就提示用户
					if(json.released == "true"){
						bc.msg.confirm(json.msg,function(){
							releaseInfo();
						});
					}else{
						bc.msg.confirm("确定发布此流程部署文件吗？",function(){
							releaseInfo();
						});
					}
				}
			});

		}else{
			bc.msg.slide("一次只能选择一条信息发布！");
		}
	},
	
	releaseCancel : function (){
		var $page = $(this);
		//获取选中的行
		var $tr = $page.find(".bc-grid>.data>.right tr.ui-state-highlight");
		var $hidden = $tr.data("hidden");
		
		bc.page.newWin({
			name: "我的工作空间",
			mid: "openWorkspace",
			url: bc.root+ "/bc-workflow/workspace/open",
			data: {id: $hidden.procInstId}, 
			afterClose: function(status){
				if(status) bc.grid.reloadData($page);
			}
		});
	}
};
