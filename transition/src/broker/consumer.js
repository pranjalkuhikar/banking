const resolveContact = (account, fallback = {}) => ({
  email: account?.ownerEmail || fallback.email,
  firstName: account?.ownerName?.firstName || fallback.firstName,
  lastName: account?.ownerName?.lastName || fallback.lastName,
});

const publishNotificationEvents = async ({
  transition,
  amount,
  fromAccountObj,
  toAccountObj,
  senderFallback = {},
}) => {
  const sender = resolveContact(fromAccountObj, senderFallback);
  const receiver = resolveContact(toAccountObj);
  const dateTime = transition.createdAt
    ? new Date(transition.createdAt).toISOString()
    : new Date().toISOString();

  const jobs = [];

  if (receiver.email) {
    jobs.push(
      publishToQueue("user_credited", {
        email: receiver.email,
        firstName: receiver.firstName,
        lastName: receiver.lastName,
        amount,
        fromAccount: fromAccountObj.accountNumber,
        dateTime,
        transactionId: transition._id,
      }),
    );
  }

  if (sender.email) {
    jobs.push(
      publishToQueue("user_debited", {
        email: sender.email,
        firstName: sender.firstName,
        lastName: sender.lastName,
        amount,
        toAccount: toAccountObj.accountNumber,
        dateTime,
        transactionId: transition._id,
      }),
    );
  }

  await Promise.all(jobs);
};

export default publishNotificationEvents;
