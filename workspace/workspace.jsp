<%@ page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<div class="ws" title='<s:property value="title"/>'
	data-js='<s:url value="/bc-workflow/workspace/workspace.js"/>'
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
		<div class="info ui-widget-content" data-id="${item['id']}">
			<div class="simple">
				<div class="line ${item['type']}">
					<span class="leftIcon ui-icon ${item['iconClass']}"></span>
					<span class="text ${item['link'] ? 'link':''}">${item['subject']}</span>
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
		<div class="info">
			<div class="simple">
				<div class="line topic ${item['type']} ui-state-default ${item['type']!='others' ? 'ui-state-highlight':''}">
					<span class="leftIcon ui-icon ${item['type']=='user' ? 'ui-icon-person':(item['type']=='group' ? 'ui-icon-home':'ui-icon-cancel')}"></span>
					<span class="text">${item['subject']}</span>
					<span class="rightIcons">
						<s:if test="#item['hasButtons']">${item['buttons']}</s:if>
						<span class="toggle"><span class="ui-icon ui-icon-carat-1-ne" title="折叠|展开详细信息"></span></span>
					</span>
				</div>
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