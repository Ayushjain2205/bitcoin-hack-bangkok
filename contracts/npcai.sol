// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * @title NPCAgent
 * @dev Main contract for NPC agent
 */
contract NPCAgent is ERC721URIStorage, Ownable, ReentrancyGuard {
    struct AgentAttributes {
        uint8 funkinessLevel;
        uint8 grooveFactor;
        uint8 creativityIndex;
        uint8 soulfulness;
        string specialization;
        bool isActive;
    }

    uint256 private _tokenIds;
    mapping(uint256 => AgentAttributes) public agentAttributes;
    mapping(uint256 => address) public agentTokenContracts;

    event AgentCreated(
        uint256 indexed tokenId,
        address creator,
        string specialization
    );
    event AgentUpdated(uint256 indexed tokenId, AgentAttributes attributes);

    constructor() ERC721("NPC.ai Agents", "NPCAGT") Ownable(msg.sender) {}

    function createAgent(
        string memory tokenURI,
        AgentAttributes memory attributes
    ) external returns (uint256) {
        _tokenIds++;
        uint256 newAgentId = _tokenIds;

        _safeMint(msg.sender, newAgentId);
        _setTokenURI(newAgentId, tokenURI);

        agentAttributes[newAgentId] = attributes;

        // Deploy new token contract for this agent
        AgentToken newToken = new AgentToken(
            string.concat("Agent Token ", toString(newAgentId)),
            string.concat("AGT", toString(newAgentId))
        );
        agentTokenContracts[newAgentId] = address(newToken);

        emit AgentCreated(newAgentId, msg.sender, attributes.specialization);
        return newAgentId;
    }

    function updateAgentAttributes(
        uint256 tokenId,
        AgentAttributes memory newAttributes
    ) external {
        require(ownerOf(tokenId) == msg.sender, "Not agent owner");
        agentAttributes[tokenId] = newAttributes;
        emit AgentUpdated(tokenId, newAttributes);
    }

    function getAgentDetails(
        uint256 tokenId
    )
        external
        view
        returns (AgentAttributes memory attributes, address tokenContract)
    {
        return (agentAttributes[tokenId], agentTokenContracts[tokenId]);
    }

    // Helper function to convert uint to string
    function toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}

/**
 * @title AgentToken
 * @dev ERC20 token contract for individual agents
 */
contract AgentToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10 ** 18; // 1 million tokens

    constructor(
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}

/**
 * @title NPCMarketplace
 * @dev Marketplace contract for trading agent tokens
 */
contract NPCMarketplace is ReentrancyGuard, Ownable {
    struct TokenListing {
        address tokenContract;
        uint256 amount;
        uint256 pricePerToken;
        address seller;
        bool isActive;
    }

    mapping(uint256 => TokenListing) public listings;
    uint256 private _listingIds;

    event ListingCreated(
        uint256 indexed listingId,
        address seller,
        address tokenContract,
        uint256 amount,
        uint256 price
    );
    event ListingCancelled(uint256 indexed listingId);
    event TokensPurchased(
        uint256 indexed listingId,
        address buyer,
        uint256 amount
    );

    constructor() Ownable(msg.sender) {}

    function createListing(
        address tokenContract,
        uint256 amount,
        uint256 pricePerToken
    ) external nonReentrant returns (uint256) {
        require(amount > 0, "Amount must be greater than 0");
        require(pricePerToken > 0, "Price must be greater than 0");

        _listingIds++;
        uint256 listingId = _listingIds;

        // Transfer tokens to marketplace
        require(
            IERC20(tokenContract).transferFrom(
                msg.sender,
                address(this),
                amount
            ),
            "Token transfer failed"
        );

        listings[listingId] = TokenListing({
            tokenContract: tokenContract,
            amount: amount,
            pricePerToken: pricePerToken,
            seller: msg.sender,
            isActive: true
        });

        emit ListingCreated(
            listingId,
            msg.sender,
            tokenContract,
            amount,
            pricePerToken
        );
        return listingId;
    }

    function purchaseTokens(
        uint256 listingId,
        uint256 amount
    ) external payable nonReentrant {
        TokenListing storage listing = listings[listingId];
        require(listing.isActive, "Listing is not active");
        require(amount <= listing.amount, "Insufficient tokens available");

        uint256 totalPrice = amount * listing.pricePerToken;
        require(msg.value >= totalPrice, "Insufficient payment");

        // Transfer tokens to buyer
        require(
            IERC20(listing.tokenContract).transfer(msg.sender, amount),
            "Token transfer failed"
        );

        // Transfer payment to seller
        payable(listing.seller).transfer(totalPrice);

        // Refund excess payment
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        // Update listing
        listing.amount -= amount;
        if (listing.amount == 0) {
            listing.isActive = false;
        }

        emit TokensPurchased(listingId, msg.sender, amount);
    }

    function cancelListing(uint256 listingId) external nonReentrant {
        TokenListing storage listing = listings[listingId];
        require(listing.seller == msg.sender, "Not listing owner");
        require(listing.isActive, "Listing is not active");

        // Return tokens to seller
        require(
            IERC20(listing.tokenContract).transfer(msg.sender, listing.amount),
            "Token transfer failed"
        );

        listing.isActive = false;
        emit ListingCancelled(listingId);
    }
}
