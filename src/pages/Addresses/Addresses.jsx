import { useEffect, useState } from "react";
import Main from "../../components/Main/Main";
import styles from "./Addresses.module.css";
import useSendRequest from "../../util/useSendRequest";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import AddressComponent from "../../components/AddressComponent/AddressComponent";

export default function Addresses() {
    const sendRequest = useSendRequest();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest("food/address/");
            if (response.isOk) {
                setAddresses(response.data);
            }
        };

        send();
    }, []);

    return (
        <Main>
            <div className={styles.newAddressLinkContainer}>
                <Link to={"/manage-address"} className={styles.newAddressLink}>
                    <Button>ایجاد آدرس جدید</Button>
                </Link>
            </div>

            <div className={styles.addressesContainer}>
                {addresses.map((address) => (
                    <AddressComponent address={address} key={address.id} />
                ))}
            </div>
        </Main>
    );
}
