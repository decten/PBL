var DocumentTransfer;
var HashValue;
var contractAddress = "0xB3d5d6313061eA4cb5b52Db2F65932D1d90d7Ac2";
var shipperAddress;
var consigneeAddress;

window.onload = function() {
    $.getJSON("../contract/DocumentTransfer.json", function(json) { // 컨트랙트 ABI 불러오기 
        var contract = require("@truffle/contract");
        DocumentTransfer = contract( json );
        DocumentTransfer.setProvider(new Web3.providers.HttpProvider("http://localhost:8545")); 
      //로컬 이더리움 cli(=가나슈)와 연동을 위한 웹(web3) 설정 
    });
}

function _registerShipper() {
    $("#shipperRegistrationMessage").html('');

    shipperAddress = $("#signup-ID").val();

    DocumentTransfer.deployed()
    .then(instance => instance.isRegisteredShipper(shipperAddress))//이미 등록된 계정인지 확인
    .then(isRegisteredShipper => {
        if (isRegisteredShipper) //이미 등록된 수출자 = 에러 출력 
        {
            $("#shipperRegistrationMessage").html("The shipper is already registered.");
        }
        else //등록되지 않은 수출자= 등록하기 
        {
            DocumentTransfer.deployed()
            .then(instance => instance.registerShipper(shipperAddress)) //
            .catch(e => $("#voterRegistrationMessage").html(e));

            $("#shipperRegistrationMessage").html("Registration successed.");
        }
    })
}

function _registerIPFS() {// 등록용
    //IPFS에 등록해서 HASH 얻었다는 전제...
    // HashValue = 어쩌구~저쩌구 입력
    _registerDoc();
}

function _registerDoc() {
    var element_m = document.getElementById("DocRegistrationMessage");
    element_m.innerText="test";
    var element = document.getElementById("setting-input2");//
    consigneeAddress = element;
    element = document.getElementById("signup-ID");//
    shipperAddress = element;
    var _hash = HashValue;
    alert("3");
    DocumentTransfer.at(contractAddress).deployed()
    .then(instance => instance.isRegisteredShipper(shipperAddress))
    .then(isRegisteredShipper => {
        alert("4");
        if (isRegisteredShipper) //등록된 수출자 = 문서 등록 진행 
        {   alert("2");
            instance.registerDoc(_hash, consigneeAddress); 
            element_m.innerText = "Registration successed.";
        }
        else //등록되지 않은 수출자 = 에러 발생 
        {   
            alert("1");
            element_m.innerText = "The shipper is unknown.";
        }
    })


    

    
}
function _checkIPFS() {// 체크용
    //문서 위변조 여부에 사용되는 부가적 함수.
    // IPFS에 실제로 등록해보고, 추출된 hash값 사용. (등록목적X.) 
    // HashValue = 어쩌구~저쩌구 저장 
    _isDocSame();
}

function _isDocSame() {
    $("#DocCompareMessage").html('');

    var _index = $("#setting-input2").val();
    var _hash = HashValue;

    DocumentTransfer.deployed()
    .then(instance => instance.isDocSame(_hash, _index))
    .then(isDocSame => {
        if (isDocSame)//해당 파일 일치함.  
        {
            setDocisChanged(_index, 0);
            $("#DocCompareMessage").html('This file matches the original. You can use it.');
        }
        else //해당 파일 불일치.   
        {   
            setDocisChanged(_index, 1);
            $("#DocCompareMessage").html('This file is inconsistent with the original. Please avoid using it.');
        }
    })
}

function loadDocsTable() {
    DocumentTransfer.deployed()
    .then(instance => instance.getConsigneeDocNum())
    .then(DocsNum => {
        
        
        var docList = [];
        j =0;
        for (var i = 0; i < DocsNum; i++) {//소유한 서류의 갯수만큼 반복해서 모든 문서의 위치(index)를 리스트로 가져옴. 
            
            getConsigneeIndex(consigneeAddress,i)
            .then(ConsigneeIndex=>{
                docList.push(ConsigneeIndex);
            })
        }
        var innerHtml = "<tr><th class='cell text-center'>" + "번호"+ "</th><th class='cell text-center'>"+ "서류 지문" + "</th><th class='cell text-center'>" + "업로드" + "</th><th class='cell text-center'>" +"날짜" +"</th><th class='cell text-center'>"+"검증"+"</th><th class='cell text-center'>"+"상태"+"</th><th class='cell text-center'>"+"자세히"+"</th><th class='cell text-center'>"+"다운로드"+"</th><th class='cell text-center'></th></tr>";
        for(var i in docList){//문서의 위치 구조체 불러와서 출력하기 

            var _hash = getDocHash(i);
            var _isChanged = getDocisChanged(i);
            var _status = getDocStatus(i);
            var status_m = "";
            var isChanged_m = "";

            if (_status == 1){ status_m = "등록완료";}
            else { status_m = "열람됨";}
            if (_isChanged == 1){ isChanged_m = "위험";}
            else { isChanged_m = "안전";}
            innerHtml = innerHtml + "<tr><td class='cell text-center'>" + (i++) + "</td>" + "<td class='cell text-center'>" + _hash + "</td>" + "<td class='cell text-center'>" + shipperAddress + "</td>" + "<td class='cell text-center'>" + "<span>2021.09.21</span><span class='note'>2:16 PM</span>" + "</td>" + "<td class='cell text-center'><span class='badge bg-success'>" + isChanged_m + "</span></td>" + "<td class='cell text-center'>" + status_m + "</td>" + "<td class='cell text-center'><a class='btn-sm app-btn-secondary' href='assets/images/BL_example2.png' onclick='window.open(this.href, '_blank', 'width=+img_width+,height=+img_width+,toolbars=no,scrollbars=no'); return false;'>"+선택+"</a></td>" + "<td class='cell text-center'><a class='btn-sm app-btn-secondary' href='assets/images/BL_example2.png' onclick='window.open(this.href, '_blank', 'width=+img_width+,height=+img_width+,toolbars=no,scrollbars=no'); return false;'>"+다운로드+"</a></td></tr>" ;
            $("#DocsTable").html(innerHtml);
        }
        
    })
}

