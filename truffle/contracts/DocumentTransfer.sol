pragma solidity ^0.5.16;

contract DocumentTransfer {
    struct Shipper {
        uint [] DocuIndex; 
        bool isRegistered;
    }

    struct Consignee {
        uint [] DocuIndex;
        bool isRegistered;
    }       
    
    struct Document {
        uint index;
        bytes hashValue; 
        bool isChanged; 
        uint status;
    }                                                                                               

    modifier onlyRegisteredShipper() { 
        require(shippers[msg.sender].isRegistered, 
           "the caller of this function must be a registered Consignee");
       _;
    }

    modifier onlyRegisteredConsignee() { 
        require(consignees[msg.sender].isRegistered, 
           "the caller of this function must be a registered Consignee");
       _;
    }

    mapping(address => Shipper) public shippers;
    mapping(address => Consignee) public consignees;
    Document [] public documents; 

    constructor() public { }   

    function registerShipper(address _shipperAddress) 
        public {
        require(!shippers[ _shipperAddress].isRegistered, "the shipper is already registered");
        shippers[ _shipperAddress].isRegistered = true;
    }
    
    function registerConsignee(address _consigneeAddress, uint _index) 
        public onlyRegisteredShipper {
        if (consignees[ _consigneeAddress].isRegistered){
            consignees[ _consigneeAddress].DocuIndex.push(_index);
        } else {
            consignees[ _consigneeAddress].DocuIndex.push(_index);
            consignees[ _consigneeAddress].isRegistered = true;
        }
        
    } 

    function registerDoc( bytes memory _hashValue, address _consigneeAddress) public onlyRegisteredShipper {
        uint _index = 
        documents.push(Document({
            index : 0,
            hashValue: _hashValue,
            isChanged:  false,
            status : 1
            }));
        documents[_index].index = _index-1;
        shippers[msg.sender].DocuIndex.push(_index -1);
        registerConsignee(_consigneeAddress, _index-1);
    }

    function getDocHash(uint _index) public
        returns (bytes memory) {
        documents[_index].status = 2;
        return documents[_index].hashValue;
    }

    function isDocSame(bytes memory hashA, uint _index) public
        returns (bool) {
        bytes memory hashB = getDocHash(_index);
        return keccak256(hashA) == keccak256(hashB);
    }

    function getDocStatus(uint _index) public view
	    returns (uint) {
	    return documents[_index].status;
	}

    function getDocisChanged(uint _index) public view
	    returns (bool) {
	    return documents[_index].isChanged;
	}

    function getShipperDocNum() public view
	    returns (uint) {
	    return shippers[msg.sender].DocuIndex.length;
	}

    function getConsigneeDocNum() public view
	    returns (uint) {
	    return consignees[msg.sender].DocuIndex.length;
	}

    function getShipperIndex(address _shipperAddress, uint _index) public view
	    returns (uint) {
            return shippers[_shipperAddress].DocuIndex[_index];
	}

    function getConsigneeIndex(address _consigneeAddress, uint _index) public view
	    returns (uint) {
            return consignees[_consigneeAddress].DocuIndex[_index];
	}
}

