<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="sidebar-todo"
	data-js='<s:url value="/bc-workflow/todo/sidebar.js"/>'
	data-initMethod='bc.sidebar.todo.init' style="overflow-y: hidden;">
	<!-- 大标题 -->
	<table class="ui-widget-header" cellspacing="0" cellpadding="0">
		<tr>
			<td style="width: 16px;"><span
				class="custom inputIcon ui-icon ui-icon-calendar"></span></td>
			<td style="text-align: left;">待办事项</td>
			<td style="text-align: right;">
				<ul class="inputIcons">
					<li class="more custom inputIcon ui-icon ui-icon-folder-open" title="点击查看更多"></li>
				</ul>
			</td>
		</tr>
	</table>
	
	<!-- 没有待办时显示的提示 -->
	<s:if test="%{todoList == null}">
		<div class="empty ui-widget-content">(没有待办信息)</div>
	</s:if>
	<s:else>
		<!-- 待办任务列表 -->
		<table class="tasks ui-widget-content" cellspacing="0" cellpadding="0">
			<s:iterator value="todoList">	
				<tr class="task">
					<td class="ui-widget-content">
						<div class="simple ui-state-default">
							<span class="icons">
								<span title="折叠|展开任务详情"class="toggle ui-icon ui-icon-carat-1-nw"></span>
								<s:if test="%{['isTimeOver'] == true}">
									<span title="此任务有办理期限"class="alarm ui-icon ui-icon-clock"></span>
								</s:if>
								<s:if test="%{['assignee'] == null || ['assignee'].length() <= 0}">
									<span title="点击领取任务"class="group ui-icon ui-icon-person"></span>
								</s:if>
							</span>
							<span class="name"><s:property value="%{['title']}" /></span>
						</div>
						<div class="detail">
							<span class="taskidvalue">
								<input type="hidden" name="taskId" value="<s:property value="%{['taskId']}" />" />
							</span>
							<span class="procinstidvalue">
								<input type="hidden" name="procInstId" value="<s:property value="%{['procInstId']}" />" />
							</span>
							<s:if test="%{['dueDate'] != null}">
							<div class="durdate"><span class="content ui-state-highlight">
								<s:text name="todo.personal.dueDate"/>：<s:property value="%{['dueDate']}" />
							</span></div>
							</s:if>
							<s:if test="%{['description'] != null && ['description'].length() > 0}">
								<div class="desc low"><s:text name="todo.personal.description"/>：<s:property value="%{['description']}" /></div>
							</s:if>
							<div class="createTime low"><s:text name="todo.personal.createTime"/>：<s:property value="%{['createTime']}" /></div>
							<div class="category low"><s:text name="todo.personal.arpName"/>：<s:property value="%{['category']}" /></div>
						</div>
					</td>
				</tr>
			</s:iterator>
		</table>
	</s:else>
</div>