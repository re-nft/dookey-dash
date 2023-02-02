# dookey-dash spec

## Introduction

Note that the following design does not require us to build a contract. We
could have gone a more decentralised option, but it would be more expensive,
and would not give the lender such a good control of choosing who he wants
to pick to delegate the sewer pass to. We want people who want to play the game
to compete for the sewer pass.

There will be no financial component. To avoid getting sued.
And hopefully to avoid having pro players inflate the scores
too much.

Delegation API is quite simple. You specify three things:

(i) who to delegate to (hot wallet)

(ii) nft contract address

(iii) nft token id

you take those three things together and make a blockchain call.

Here is a video explanation: https://www.youtube.com/watch?v=xinrp3BlEvo

Note an important point: it is the last wallet that interacted
with the game whose score is recorded. So if I delegate my
pass to cawfree, and he scores 200k, but I scored 100k
from my wallet, and cawfree's was the last play, BAYC will
record 200k score. If, however, my wallet was the last to play
the game, the score recorded by BAYC will be 100k. Despite
cawfree playing better than me. This is a crucial point. We can
describe this somewhere on our website.

## Functional Requiremenets

### API Specification

| Endpoint                  | Type | Who    |
| ------------------------- | ---- | ------ |
| /dookeydash/createLending | POST | lender |
| /dookeydash/requestPlay   | POST | renter |
| /dookeydash/acceptPlayer  | POST | lender |
| /dookeydash/deleteListing | POST | lender |
| /dookeydash               | GET  |        |

#### `/dookeydash/createLending`

| Param               | Note |
| ------------------- | ---- |
| sewer pass token id |      |
| owner address       |      |

No blockchain txns at this stage. This simply goes into our db of available
lendings.

#### `/dookeydash/requestPlay`

| Param                      | Note                                                                                                                                                                 |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address that wants to play | Note that this might not be the active (currently selected wallet). This is because you might be requesting for some other wallet. So this should be an input value. |
| id of the lending          |                                                                                                                                                                      |

This does not create any blockchain transactions either. This merely signals the
intent that someone wants to play with your sewer pass. We need this step because
to delegate your sewer pass to someone, you first need to know their address.
That is why we cannot have lender simply create a lending and renter uptake it.
We create a lending, we let a bunch of people submit their request to play,
and then the lender will pick whom he wants to delegate to.

**(Optional) (Bonus Points)**. If you manage to figure out what the highest
score of the requester was in the games they have played, then this is a very
important piece of information for the lender. They will be able to pick who
to delegate to based on this crucial piece of information. I know it is possible
to figure this out, because this would not have been possible:

https://twitter.com/ApeCollector/status/1617884004434448384

I can explore the networks tab tomorrow inside of dookey to help you pinpoint
bayc's API here. If you do not reverse engineer this before then ;)

(This might give you a clue, look into requests over here:
https://rad.layerr.xyz/. They are clearly pulling the scores from somewhere)

When creating request to play, do create a unique request id just like with
lending. So we can uniquely identify these. Just like with lendings, this goes
into the db.

#### `/dookeydash/acceptPlayer`

| Param              | Note |
| ------------------ | ---- |
| request to play id |      |

This **will** create a blockchain txn. You need to call delegate cash's smart
contract with three pieces of information as described at the start of this
md. This will also fly into our db with this API to signal who the active
renter / player is.

#### `/dookeydash/deleteListing`

| Param      | Note |
| ---------- | ---- |
| lending id |      |

Removes the lending from the db, this implies that when we pull the set of
all lendings, this lending will no longer show up on the front end.
Additionally, do make another delegate.cash smart contract call to overwrite
the previous delegatee. The delegatee should be either the zero address, or
the owner of the sewer pass. I think it should probably be the zero address
since that what it would be in the smart contract by default (zero storage slot).
But I trust Bauti will figure this out.

#### `/dookeydash`

Returns the set of all lendings and rentings. Pulls from our very own db.

### Schema

#### `lendings`

| Key | Field               | Type |
| --- | ------------------- | ---- |
| PK  | lending_id          | int  |
|     | created_at          | int  |
|     | sewer_pass_token_id | int  |
|     | owner_address       | str  |

#### `requests`

| Key | Field                             | Type |
| --- | --------------------------------- | ---- |
| PK  | request_id                        | int  |
| FK  | lending_id                        | int  |
|     | player_address                    | str  |
|     | created_at                        | int  |
|     | highest_score                     | int  |
|     | highest_score_timestamp           | int  |
|     | highest_score_sewer_pass_token_id | int  |

Note that highest score sewer pass token id field will tell the lender
whether the player achieved the high score on their lent sewer pass
or not.

## Conclusion

Divide and Conquer :)

As you can see this is a little outside of what our "natural flow" is. So feel
free to Tailwind your way around some areas. Like where a bunch of people can
request to play with your sewer pass. In my head this is some sort of a simple
table with a list of people who want to play, after you navigate to your lending.
Perhaps, this is a completely stand-alone app? But I think it would be easier
to use our dapp. Whatever you think is the fastest, go ahead with it.

