// ==UserScript==
// @name        极空间集数
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  FKJKJ
// @author       THUJX17
// @match           *://*/home/video* 
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.4.0/jquery.min.js
// @require      https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js
// @require     https://unpkg.com/ajax-hook@2.1.3/dist/ajaxhook.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var jq=jQuery.noConflict();
    ah.proxy({

        //请求成功后进入
        onResponse: (response, handler) => {
            if(response.config.url.startsWith('/zvideo/collection/v2/info?')){
                jq('#input_json_obj').val(response.response);
                //jq('#fuckjkj').show();
                console.log(JSON.parse(response.response))
                jq('#input_ok').click();
            }
            handler.next(response)
        }
    })
    //console.log(window.location.href);
    jq(document.body).append(`
    <div  style='z-index:9990;position:absolute;right:10px;top:0px;bottom:10px;'><button id='showhide'>显示隐藏</button></div>
    <div id='fuckjkj'
    style='z-index:9990;position:absolute;left:200px;top:20px;background-color:#ffefff'
    >
    
    <br>
    <textarea id='input_json_obj'></textarea>
    <br>
    <button id='input_ok'>录入</button>
    <br>
    第<input id='epid' type='number'/>个数字作为集数，<button id='previewep'>集数预览</button><button id='onekey'>一键完成</button>
    <button id='onekeyout'>一键移出</button>
    <br>
    <button id='reverseselect'>反向选择</button>选中指定过滤器的项目： <input id='fnamefilter' type='text'/><button id='okfilter'>选中</button><i style='color:red' id='logre'></i>
    <br>
    <span>
    <div style='height:50px;font-size:8px;overflow-y:scroll;'>
    token=<i id='token'  style="line-break:anywhere"></i>
    <br>
    collection_id=<i id='collection_id'></i>
    <br>
    classification_id=<i id='classification_id'></i>
    <br>
    nas_id=<i id='nas_id'></i>
    <br>
    device_id=<i id='device_id'></i>
    <br>
    device=<i id='device'></i>
    <br>
    </div>
    <div style='height:350px;width:99%;overflow:scroll;'>
    <table id='list' border='1'>
    <tr>
    <th>select</th>
    <th>id</th>
    <th>episode</th>
    <th>newep</th>
    <th>video_id</th>
    <th>file_name</th>
    <th>file_path</th>
    <th>submit</th>
    </tr>
    <tbody id='xlist'></tbody>
    </table>
    </div>
    </span>
    </div>`);
    jq('#fuckjkj').toggle();
    jq('#token').text(jq.cookie('token'));
    jq('#nas_id').text(jq.cookie('nas_id'));
    jq('#device_id').text(jq.cookie('device_id'));
    jq('#device').text(jq.cookie('device'));
    jq("#reverseselect").click(()=>{
        jq('.sfid').each(()=>{
            jq(this).prop('checked',!jq(this).prop('checked'))
        })
    })
    jq("#showhide").click(function(){
        jq('#fuckjkj').toggle()
        console.log(jq('.info .left .videoImg').attr('style'))
    })
    var files;

    jq('#previewep').click(()=>{
        for(var v=0;v<files.length;v++)for(var i=0;i<files[v].version_list.length;i++){
            var ints=files[v].version_list[i].file_name.match(/(\d+)/g);
            var epnew=ints[jq("#epid").val()-1];
            files[v].version_list[i].episode_new=epnew;
            if(files[v].version_list[i].episode!=epnew){
                jq(`#eps${v}-${i}`).html(`<i style="color:red">${files[v].version_list[i].episode}</i>`);
                jq(`#eps_new${v}-${i}`).val(epnew);
                jq(`input.sfid${v}-${i}`).prop('checked',true);
            }
        }
    })
    jq('#onekey').click(()=>{
        for(var v=0;v<files.length;v++)for(var i=0;i<files[v].version_list.length;i++){
            if(jq(`input.sfid${v}-${i}`).prop('checked')){
                console.log(v,i);
                jq(`#submit${v}-${i}`).click();
            }
        }

    })
    jq('#onekeyout').click(()=>{
        for(var v=0;v<files.length;v++)for(var i=0;i<files[v].version_list.length;i++){
            if(jq(`input.sfid${v}-${i}`).prop('checked')){
                console.log(v,i);
                jq(`#ruleout${v}-${i}`).click();
            }
        }
    })
    jq('#input_ok').click(()=>{
        jq('#xlist').html('');
        console.log('inputok');
        var ctt=JSON.parse(jq('#input_json_obj').val())
        var collection_id=ctt.data.collection_id;jq('#collection_id').text(collection_id);
        var classification_id=ctt.data.classification_id;jq('#classification_id').text(classification_id);

        files=ctt.data.list;
        for(var v=0;v<files.length;v++){
            for(var i=0;i<files[v].version_list.length;i++){
                files[v].version_list[i].episode_new=files[v].version_list[i].episode;
                jq('#xlist').append(`
            <tr>
            <td><input class='sfid sfid${v}-${i}' type='checkbox'></td>
            <td>${v}-${i}</td>
            <td id='eps${v}-${i}'>${files[v].version_list[i].episode}</td>
            <td><input id='eps_new${v}-${i}' type='number' value='${files[v].version_list[i].episode_new}'/></td>
            <td>${files[v].version_list[i].video_id}</td>
            <td>${files[v].version_list[i].file_name}</td>
            <td>${files[v].version_list[i].file_path}</td>
            <td><button id='submit${v}-${i}'>提交修改</button><button id='ruleout${v}-${i}'>移出</button></td>
            </tr>
            `)
                //手动指定集数
                jq(`#eps_new${v}-${i}`).on('input',{
                    v:v,i:i
                },(event)=>{
                    var v=event.data.v,i=event.data.i;
                    if(jq(`#eps_new${v}-${i}`).val()!=files[v].version_list[i].episode_new){
                       files[v].version_list[i].episode_new=jq(`#eps_new${v}-${i}`).val()
                    }
                })
                //提交集数
                jq(`#submit${v}-${i}`).click({
                    v:v,
                    i:i,
                    collection_id:collection_id,
                    classification_id:classification_id,
                },(event)=>{
                    var i=event.data.i,v=event.data.v;
                    console.log(files[v].version_list[i])
                    jq.ajax({
                        url:'/zvideo/collection/modify?&rnd='+Date.now()+'&webagent=v2',
                        type:'POST',
                        data:{
                            collection_id:event.data.collection_id,
                            classification_id:event.data.classification_id,
                            file_path:files[v].version_list[i].file_path,
                            video_id:files[v].version_list[i].video_id,
                            episode:files[v].version_list[i].episode_new,
                            plat:'web',
                            version:jq.cookie('version'),
                            device_id:jq.cookie('device_id'),
                            device:jq.cookie('device'),
                            token:jq.cookie('token'),
                            nasid:jq.cookie('nas_id')
                        }})


                })
                //提交移出
                jq(`#ruleout${v}-${i}`).click({
                    v:v,
                    i:i,
                    collection_id:collection_id,
                    classification_id:classification_id,

                },(event)=>{
                    var i=event.data.i,v=event.data.v;
                    console.log(files[v].version_list[i]);
                    jq.ajax({
                        url:'/zvideo/collection/ruleout?&rnd='+Date.now()+'&webagent=v2',
                        type:'POST',
                        data:{
                            collection_id:event.data.collection_id,
                            classification_id:event.data.classification_id,
                            video_id:files[v].version_list[i].video_id,
                            plat:'web',
                            version:jq.cookie('version'),
                            device_id:jq.cookie('device_id'),
                            device:jq.cookie('device'),
                            token:jq.cookie('token'),
                            nasid:jq.cookie('nas_id')
                        }})


                })
            }
        }

    });
    let filterExpr=()=>{
        var f=jq('#fnamefilter').val();
        if(f!==''){
            try{
                var exp=new RegExp(f);
                jq('#logre').text('')

                for(var v=0;v<files.length;v++)for(var i=0;i<files[v].version_list.length;i++){
                    if(files[v].version_list[i].file_path.match(exp)!=null){
                        jq(`input.sfid${v}-${i}`).prop('checked',true);
                    }
                    else{
                        jq(`input.sfid${v}-${i}`).prop('checked',false);
                    }
                }
            }
            catch(e){
                jq('#logre').text('ERROR')
            }
        }
    }
    jq('#fnamefilter').on('input',filterExpr)
    jq('#okfilter').click(filterExpr)
})();

/*
*/
