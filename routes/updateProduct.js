import express from 'express';
import { collection, getDocs, where, query, doc, getDoc, updateDoc } from 'firebase/firestore';
import schedule from 'node-schedule';
import { db } from '../config/db.js';
import { sendBiderEmail, sendProductOwnerEmail, sendProductOwneractivationEmail, sendProductOwnerEmailButNoBid } from '../tasks/sendEmails.js';

const router = express.Router();

router.get('/', (req, res) => {

    res.send({ msg: "Successfully" });
});

router.put('/avtivateproduct', async (req, res) => {

    const { body: { startingTime, productId } } = req;

    schedule.scheduleJob(new Date(startingTime), async () => {

        const productDoc = doc(db, "products", productId);
        const productData = await getDoc(productDoc);

        const productOwnerDoc = doc(db, "users", productData.data().uid);
        const productOwnerData = await getDoc(productOwnerDoc);

        await sendProductOwneractivationEmail(productOwnerData.data().email, productData.data().title, productData.data().price, productData.id);

        await updateDoc(productDoc, {
            activated: true,
        });

    });

    res.send({ msg: "successfully" });
});

router.put('/deavtivateproduct', async (req, res) => {

    const { body: { expiryTime, productId } } = req;

        schedule.scheduleJob(new Date(expiryTime), async () => {

            const getLastBidCollection = collection(db, "bids");

            const bidsQuery = query(
                getLastBidCollection,
                where("productId", "==", productId)
            );

            const bids = await getDocs(bidsQuery);

            if(bids.docs.length){
                const bid = bids.docs[bids.docs.length - 1].data();

            const productDoc = doc(db, "products", bid.productId);

            const productData = await getDoc(productDoc);

            const userInfoDoc = doc(db, "users", bid?.uid);
            const productOwnerDoc = doc(db, "users", productData?.data().uid);

            const biderData = await getDoc(userInfoDoc);
            const productOwnerData = await getDoc(productOwnerDoc);

            await sendBiderEmail(biderData.data().email, bid.bidAmount, productData.data().title);
            await sendProductOwnerEmail(productOwnerData.data().email, biderData.data().email, bid.bidAmount, productData.data().title);

            await updateDoc(productDoc, {
                activated: false,
                bidWinner: biderData.id
            });
            }else{
            const productDoc = doc(db, "products", productId);

            const productData = await getDoc(productDoc);

            const productOwnerDoc = doc(db, "users", productData?.data().uid);

            const productOwnerData = await getDoc(productOwnerDoc);

            await sendProductOwnerEmailButNoBid(productOwnerData.data().email, productData.data().title);

            await updateDoc(productDoc, {
                activated: false,
            });
            }
        });

        res.send({msg: "successfully"});
});

export default router;