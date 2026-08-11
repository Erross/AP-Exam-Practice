// Temporary WIP corrections for the AP English public-domain replacement pass.
// Fold these changes into the canonical set definitions before release.
(function () {
  "use strict";
  const bank = window.QUESTIONS_AP_ENGLISH_LITERATURE;
  if (!Array.isArray(bank)) throw new Error("AP Literature replacements must load first");

  const byId = new Map(bank.map((q) => [q.id, q]));

  // The prior draft abbreviated Ibsen's opening stage direction. Use a contiguous,
  // verbatim excerpt from the R. Farquharson Sharp Project Gutenberg text instead.
  const dollGroup = bank.filter((q) => q.stimulusGroupId === "aplit-g-ld-orbit");
  const dollStimulus = dollGroup[0].stimulus;
  dollStimulus.text = `A bell rings in the hall; shortly afterwards the door is heard to open.
Enter NORA, humming a tune and in high spirits. She is in outdoor dress
and carries a number of parcels; these she lays on the table to the
right. She leaves the outer door open after her, and through it is seen
a PORTER who is carrying a Christmas Tree and a basket, which he gives
to the MAID who has opened the door.

Nora. Hide the Christmas Tree carefully, Helen. Be sure the children
do not see it until this evening, when it is dressed. (To the PORTER,
taking out her purse.) How much?

Porter. Sixpence.

Nora. There is a shilling. No, keep the change. (The PORTER thanks her,
and goes out. NORA shuts the door. She is laughing to herself, as she
takes off her hat and coat. She takes a packet of macaroons from her
pocket and eats one or two; then goes cautiously to her husband's door
and listens.) Yes, he is in. (Still humming, she goes to the table on
the right.)

Helmer (calls out from his room). Is that my little lark twittering out
there?

Nora (busy opening some of the parcels). Yes, it is!

Helmer. Is it my little squirrel bustling about?

Nora. Yes!

Helmer. When did my squirrel come home?

Nora. Just now. (Puts the bag of macaroons into her pocket and wipes her
mouth.) Come in here, Torvald, and see what I have bought.

Helmer. Don't disturb me. (A little later, he opens the door and looks
into the room, pen in hand.) Bought, did you say? All these things? Has
my little spendthrift been wasting money again?

Nora. Yes but, Torvald, this year we really can let ourselves go
a little. This is the first Christmas that we have not needed to
economise.

Helmer. Still, you know, we can't spend money recklessly. Nora. Yes,
Torvald, we may be a wee bit more reckless now, mayn't we? Just a tiny
wee bit! You are going to have a big salary and earn lots and lots of
money.

Helmer. Yes, after the New Year; but then it will be a whole quarter
before the salary is due.

Nora. Pooh! we can borrow until then.

Helmer. Nora! (Goes up to her and takes her playfully by the ear.) The
same little featherhead! Suppose, now, that I borrowed fifty pounds
today, and you spent it all in the Christmas week, and then on New
Year's Eve a slate fell on my head and killed me, and--Nora (putting her
hands over his mouth). Oh! don't say such horrid things.

Helmer. Still, suppose that happened,--what then?

Nora. If that were to happen, I don't suppose I should care whether I
owed money or not.

Helmer. Yes, but what about the people who had lent it?

Nora. They? Who would bother about them? I should not know who they
were.

Helmer. That is like a woman! But seriously, Nora, you know what I think
about that. No debt, no borrowing. There can be no freedom or beauty
about a home life that depends on borrowing and debt. We two have kept
bravely on the straight road so far, and we will go on the same way for
the short time longer that there need be any struggle.

Nora (moving towards the stove). As you please, Torvald.`;
  dollStimulus.source = "Public-domain text: https://www.gutenberg.org/ebooks/2542, 1879; R. Farquharson Sharp translation.";

  // Match the exact Project Gutenberg edition used for the Trifles transcription.
  const trifles = bank.find((q) => q.stimulusGroupId === "aplit-g-ld-kitchen").stimulus;
  trifles.source = "Public-domain text: https://www.gutenberg.org/ebooks/59432, 1916.";

  // The first Wilde draft stopped immediately after Algernon's closing judgment of Lane.
  // Continue the same contiguous Act I excerpt through Jack's entrance and the next exchange
  // so the drama set clears the project's minimum passage-length gate without padding.
  const wilde = bank.find((q) => q.stimulusGroupId === "aplit-g-ld-clock").stimulus;
  wilde.text += `

[Enter Lane.]

LANE. Mr. Ernest Worthing.

[Enter Jack.]

[Lane goes out.]

ALGERNON. How are you, my dear Ernest? What brings you up to town?

JACK. Oh, pleasure, pleasure! What else should bring one anywhere? Eating as usual, I see, Algy!

ALGERNON. [Stiffly.] I believe it is customary in good society to take some slight refreshment at five o'clock. Where have you been since last Thursday?

JACK. [Sitting down on the sofa.] In the country.

ALGERNON. What on earth do you do there?

JACK. [Pulling off his gloves.] When one is in town one amuses oneself. When one is in the country one amuses other people. It is excessively boring.

ALGERNON. And who are the people you amuse?

JACK. [Airily.] Oh, neighbours, neighbours.

ALGERNON. Got nice neighbours in your part of Shropshire?

JACK. Perfectly horrid! Never speak to one of them.

ALGERNON. How immensely you must amuse them! [Goes over and takes sandwich.] By the way, Shropshire is your county, is it not?`;

  // Avoid stacked absolute-language distractors in the Ibsen structure question.
  const orbitSix = byId.get("aplit-ld-orbit-06");
  const correct = orbitSix.o[orbitSix.c[0]];
  orbitSix.o = orbitSix.o.map((option) => {
    if (option === correct) return option;
    if (option === "shows that the couple never disagrees") return "suggests the couple's disagreements are merely superficial";
    if (option === "proves that Nora resents every term of affection") return "suggests Nora resents Helmer's terms of affection";
    return option;
  });
  orbitSix.c = [orbitSix.o.indexOf(correct)];
})();
