<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="ws" title='<s:property value="title"/>'
	data-js='<s:url value="/bc-workflow/workspace/workspace.js"/>,<s:url value="/bc-workflow/flowattach/flowattach.js"/>'
	data-initMethod='bc.flow.workspace.init'
	data-option='<s:property value="pageOption"/>' style="overflow-y: auto;">
<s:if test="%{error.length()>0}">
	<!-- 异常信息区 -->
	<div class="error">
		<div><s:property value="error"/><span class="click2see">详细情况</span></div>
		<pre class="ui-widget-content hide"><s:property value="errorDetail"/></pre>
	</div>
</s:if>
<s:else>
	<!-- 公共信息区 -->
	<div class="common ui-widget-content" >
		<!-- 标题行 -->
		<div class="header line ui-widget-header">
			<span class="leftIcon ui-icon ui-icon-suitcase"></span>
			<span class="text">公共信息</span>
			<span class="rightIcons">
				<s:if test="%{ws['commonInfo']['hasButtons']}">${ws['commonInfo']['buttons']}</s:if>
				<span class="reverse"><span class="ui-icon ui-icon-carat-2-n-s" title="反转详细信息区域的显示"></span></span>
				<span class="toggle"><span class="ui-icon ui-icon-triangle-1-n" title="折叠|展开公共信息"></span></span>
			</span>
		</div>
		<!-- 信息列表 -->
		<s:iterator value="ws['commonInfo']['items']" var="item">
		<div class="info ui-widget-content" data-id="${item['id']}"
			<s:if test="%{item['type']=='attach'}">
				data-subject='<s:property value="%{item['subject']}"/>'
				data-size='<s:property value="%{item['size']}"/>'
				data-path='<s:property value="%{item['path']}"/>'
			</s:if>>
			<div class="simple">
				<div class="line ${item['type']}">
					<span class="leftIcon ui-icon ${item['iconClass']}"></span>
					<span class="text ${item['link'] ? 'link':''}">${item['subject']} (${item['sizeInfo']})</span>
					<span class="rightIcons">
						<s:if test="#item['hasButtons']">${item['buttons']}</s:if>
						<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
					</span>
				</div>
			</div>
			<div class="detail low little">
				<s:iterator value="#item['detail']">
				<div class="line">
					<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
					<span class="text"><s:property/></span>
				</div>
				</s:iterator>
			</div>
		</div>
		</s:iterator>
	</div>

	<s:if test="%{ws['flowing']}">
	<!-- 待办信息区 -->
	<div class="todo ui-widget-content">
		<!-- 标题行 -->
		<div class="header line ui-widget-header">
			<span class="leftIcon ui-icon ui-icon-calendar"></span>
			<span class="text">待办信息</span>
			<span class="rightIcons">
				<span class="reverse"><span class="ui-icon ui-icon-carat-2-n-s" title="反转详细信息区域的显示"></span></span>
				<span class="toggle"><span class="ui-icon ui-icon-triangle-1-n" title="折叠|展开公共信息"></span></span>
			</span>
		</div>
		<!-- 信息列表 -->
		<s:iterator value="ws['todoInfo']['items']" var="item">
		<div class="info" data-id="${item['id']}" data-isMyTask="${item['isMyTask']}" data-isUserTask="${item['isUserTask']}">
			<div class="simple">
				<div class="line topic ui-state-default ${item['isMyTask'] ? 'ui-state-highlight':''}">
					<span class="leftIcon ui-icon ${!item['isMyTask'] ? 'ui-icon-cancel':(item['isUserTask'] ? 'ui-icon-person':'ui-icon-home')}"></span>
					<span class="text">${item['subject']}</span>
					<span class="rightIcons">
						<s:if test="#item['hasButtons']">${item['buttons']}</s:if>
						<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
					</span>
				</div>
			</div>
			<div class="detail">
				<s:if test="%{item['dueDate'] != null}">
				<!-- 办理期限 -->
				<div class="line">
					<span class="leftIcon ui-icon ui-icon-clock"></span>
					<span class="text ui-state-focus">${item['dueDate']}</span>
				</div>
				</s:if>
				
				<s:iterator value="#item['detail']" var="d">
				<div class="line info">
					<div class="simple">
						<div class="line form">
							<span class="leftIcon ui-icon ui-icon-document"></span>
							<span class="text link">表单：测试任务表单</span>
							<span class="rightIcons">
								<span class="itemOperate edit"><span class="ui-icon ui-icon-pencil"></span><span class="text link">编辑</span></span>
								<span class="itemOperate open"><span class="ui-icon ui-icon-document-b"></span><span class="text link">查看</span></span>
								<span class="itemOperate download"><span class="ui-icon ui-icon-arrowthickstop-1-s"></span><span class="text link">下载</span></span>
								<span class="itemOperate delete"><span class="ui-icon ui-icon-closethick"></span><span class="text link">删除</span></span>
								<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
							</span>
						</div>
					</div>
					<div class="detail low little">
						<div class="line">
							<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
							<span class="text">小张 2012-01-01 08:00</span>
						</div>
					</div>
				</div>
				</s:iterator>
				
				<!-- 待办人、组 -->
				<div class="line low">
					<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
					<span class="text">${item['actor']}</span>
				</div>
				
				<!-- 创建时间 -->
				<div class="line low">
					<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
					<span class="text">${item['createTime']}</span>
				</div>
				
				<!-- 办理耗时 -->
				<div class="line low">
					<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
					<span class="text">${item['wasteTime']}</span>
				</div>
				
			</div>
		</div>
		</s:iterator>
	</div>
	</s:if>

	<!-- 已办信息区 -->
	<div class="done ui-widget-content">
		<!-- 标题行 -->
		<div class="header line ui-widget-header">
			<span class="leftIcon ui-icon ui-icon-tag"></span>
			<span class="text">已办信息</span>
			<span class="rightIcons">
				<span class="reverse"><span class="ui-icon ui-icon-carat-2-n-s" title="反转详细信息区域的显示"></span></span>
				<span class="toggle"><span class="ui-icon ui-icon-triangle-1-n" title="折叠|展开公共信息"></span></span>
			</span>
		</div>
		<!-- 信息列表 -->
		<s:iterator value="ws['doneInfo']['items']" var="item">
		<div class="info" data-id="${item['id']}">
			<div class="simple">
				<div class="line topic ui-state-default">
					<span class="leftIcon ui-icon ui-icon-flag"></span>
					<span class="text">${item['subject']}</span>
					<span class="rightIcons">
						<span class="text"><span class="ui-icon ui-icon-person"></span><span class="text">${item['assignee']}</span></span>
						<span class="text"><span class="ui-icon ui-icon-clock"></span><span class="text">${item['startTime']}</span></span>
						<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
					</span>
				</div>
			</div>
			<div class="detail">
				<!-- 办理耗时 -->
				<div class="line low">
					<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
					<span class="text">${item['wasteTime']}</span>
				</div>
				
				<s:if test="%{item['dueDate'] != null}">
				<!-- 办理期限 -->
				<div class="line">
					<span class="leftIcon ui-icon ui-icon-clock"></span>
					<span class="text ui-state-focus">${item['dueDate']}</span>
				</div>
				</s:if>
				
				<s:iterator value="#item['detail']" var="d">
				<div class="line info">
					<div class="simple">
						<div class="line form">
							<span class="leftIcon ui-icon ui-icon-document"></span>
							<span class="text link">表单：测试任务表单</span>
							<span class="rightIcons">
								<span class="itemOperate edit"><span class="ui-icon ui-icon-pencil"></span><span class="text link">编辑</span></span>
								<span class="itemOperate open"><span class="ui-icon ui-icon-document-b"></span><span class="text link">查看</span></span>
								<span class="itemOperate download"><span class="ui-icon ui-icon-arrowthickstop-1-s"></span><span class="text link">下载</span></span>
								<span class="itemOperate delete"><span class="ui-icon ui-icon-closethick"></span><span class="text link">删除</span></span>
								<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
							</span>
						</div>
					</div>
					<div class="detail low little">
						<div class="line">
							<span class="leftIcon ui-icon ui-icon-carat-1-e"></span>
							<span class="text">小张 2012-01-01 08:00</span>
						</div>
					</div>
				</div>
				</s:iterator>
			</div>
		</div>
		</s:iterator>
	</div>
	
	<!-- 隐藏信息 -->
	<form name="ws">
		<!-- 隐藏信息：流程实例 -->
		<input type="hidden" name="id" value="${ws['id']}"/>
		<input type="hidden" name="businessKey" value="${ws['businessKey']}"/>
		<input type="hidden" name="subject" value="${ws['subject']}"/>
		
		<!-- 隐藏信息：流程定义 -->
		<input type="hidden" name="definitionId" value="${ws['definitionId']}"/>
		<input type="hidden" name="definitionCategory" value="${ws['definitionCategory']}"/>
		<input type="hidden" name="definitionKey" value="${ws['definitionKey']}"/>
		<input type="hidden" name="definitionVersion" value="${ws['definitionVersion']}"/>
		<input type="hidden" name="definitionName" value="${ws['definitionName']}"/>
		<input type="hidden" name="definitionResourceName" value="${ws['definitionResourceName']}"/>
		<input type="hidden" name="definitionDiagramResourceName" value="${ws['definitionDiagramResourceName']}"/>
		
		<!-- 隐藏信息：流程发布 -->
		<input type="hidden" name="deploymentId" value="${ws['deploymentId']}"/>
	</form>
 </s:else>
</div>