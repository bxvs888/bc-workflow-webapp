bc.namespace("bc.deploy");
bc.deploy = {
	init : function() {
		var $page = $(this);
	},
	
	//发布
	release : function (){
		
		var $page = $(this);
		// 获取用户选中的条目
		var ids = bc.grid.getSelected($page.find(".bc-grid"));
		
		//定义函数
		function releaseInfo(){ 
			
			jQuery.ajax({
				url: bc.root + "/bc-workflow/deploys/dodeployRelease", 
				data: {
					excludeId: ids[0]
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
						bc.msg.alert(json.msg);
					}else{
						bc.msg.confirm("确定要发布此流程吗？",function(){
							releaseInfo();
						});
					}
				}
			});

		}else{
			bc.msg.slide("一次只能选择一条信息发布！");
		}
	},
	
	//取消发布
	releaseCancel : function (){
		var $page = $(this);
		// 获取用户选中的条目
		var ids = bc.grid.getSelected($page.find(".bc-grid"));

		// 检测是否选中条目
		if(ids.length ==0){
			bc.msg.slide("请先选择要取消发布的信息！");
			return;
		}else if(ids.length == 1){
			
			var $tr = $page.find(".bc-grid>.data>.right tr.ui-state-highlight");
			var $hidden = $tr.data("hidden");
			
			if($hidden.status == 0){
				
					jQuery.ajax({
						url: bc.root + "/bc-workflow/deploys/isStarted", 
						data: {excludeId: ids[0]},
						dataType: "json",
						success: function(json) {
							if(json.started == "true"){
								bc.msg.alert(json.msg);
							}else{
								bc.msg.confirm("确定要取消此流程吗？",function(){
									jQuery.ajax({
										url: bc.root + "/bc-workflow/deploys/dodeployCancel", 
										data: {excludeId: ids[0],isCascade: false},
										dataType: "json",
										success: function(json) {
											bc.msg.slide(json.msg);
											bc.grid.reloadData($page);
										}
									});
								});
							}
						}
					});
				
			}else{
				bc.msg.alert("未发布的信息不能取消发布！");
			}

			
		}else{
			bc.msg.slide("一次只能选择一条信息取消发布！");
		}
	},
	
	//级联取消发布
	cascadeCancel : function (){
		var $page = $(this);
		// 获取用户选中的条目
		var ids = bc.grid.getSelected($page.find(".bc-grid"));

		// 检测是否选中条目
		if(ids.length ==0){
			bc.msg.slide("请先选择要取消发布的信息！");
			return;
		}else if(ids.length == 1){
			
			var $tr = $page.find(".bc-grid>.data>.right tr.ui-state-highlight");
			var $hidden = $tr.data("hidden");
			
			if($hidden.status == 0){
				
				bc.msg.confirm("确定要级联取消此流程吗？",function(){
					jQuery.ajax({
						url: bc.root + "/bc-workflow/deploys/dodeployCancel", 
						data: {excludeId: ids[0],isCascade: true},
						dataType: "json",
						success: function(json) {
							bc.msg.slide(json.msg);
							bc.grid.reloadData($page);
						}
					});
				});
				
			}else{
				bc.msg.alert("未发布的信息不能取消发布！");
			}

			
		}else{
			bc.msg.slide("一次只能选择一条信息取消发布！");
		}
	}

};
