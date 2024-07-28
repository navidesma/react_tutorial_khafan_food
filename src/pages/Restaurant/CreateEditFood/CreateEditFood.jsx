import styles from "./CreateEditFood.module.css";
import formStyles from "../../SignUp/SignUp.module.css";
import Main from "../../../components/Main/Main";
import Input from "../../../components/Input/Input";
import TextArea from "../../../components/Input/TextArea";
import Select from "../../../components/Select/Select";
import SelectOption from "../../../components/Select/SelectOption";
import useInputValidator from "../../../util/useInputValidator";
import { formatMoney } from "../../../util/formatMoney";
import useSendRequest from "../../../util/useSendRequest";
import useError from "../../../util/useError";
import { useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateEditFood() {
    const { foodId } = useParams();
    const sendRequest = useSendRequest();
    const navigate = useNavigate();
    const nameInputState = useInputValidator();
    const descriptionInputState = useInputValidator();
    const priceInputState = useInputValidator();

    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedSubCategory, setSelectedSubCategory] = useState();

    const [categories, setCategories] = useState();
    const [subCategories, setSubCategories] = useState();

    const [imageFile, setImageFile] = useState();

    const [noSubCategoryError, setNoSubCategoryError] = useError();
    const [noImageError, setNoImageError] = useError();

    const [foodState, setFoodState] = useState();

    useEffect(() => {
        if (!foodId) return;

        const send = async () => {
            const response = await sendRequest(`food/${foodId}/`);

            if (response.isOk) {
                setFoodState(response.data);
                nameInputState.setValue(response.data.name);
                descriptionInputState.setValue(response.data.description);
                priceInputState.setValue(response.data.price);
                setSelectedCategory(response.data.category);
                setSelectedSubCategory(response.data.sub_category);
            }
        };

        send();
    }, [foodId]);

    useEffect(() => {
        const send = async () => {
            const response = await sendRequest("food/category/");
            if (response.isOk) {
                setCategories(response.data);
            }
        };

        send();
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;

        const send = async () => {
            const response = await sendRequest(`food/sub-category/${selectedCategory}/`);
            if (response.isOk) {
                setSubCategories(response.data);
            }
        };

        send();
    }, [selectedCategory]);

    const imageChangeHandler = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setImageFile(undefined);
            return;
        }

        setImageFile(event.target.files[0]);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();

        if (
            !(
                nameInputState.getIsValid() &&
                descriptionInputState.getIsValid() &&
                priceInputState.getIsValid()
            )
        ) {
            return;
        }

        if (!foodState && !imageFile) {
            setNoImageError(true);
            return;
        }

        if (!selectedSubCategory) {
            setNoSubCategoryError(true);
            return;
        }

        const body = new FormData();

        body.append("name", nameInputState.value);
        body.append("description", descriptionInputState.value);
        body.append("category", +selectedCategory);
        body.append("sub_category", +selectedSubCategory);
        body.append("price", priceInputState.value);
        if (imageFile) {
            body.append("image", imageFile);
        }

        const send = async () => {
            const response = await sendRequest(
                foodState ? `food/update/${foodId}/` : "food/create/",
                {
                    isJSON: false,
                    options: {
                        method: foodState ? "PATCH" : "POST",
                        body: body,
                    },
                },
            );

            if (response.isOk) {
                navigate("/home");
            }
        };

        send();
    };

    return (
        <Main>
            <form onSubmit={formSubmitHandler} className={formStyles.container}>
                <Input label={"عنوان غذا"} {...nameInputState.props} />
                <TextArea label={"توضیحات"} {...descriptionInputState.props} rows={5} />
                <Input
                    label={"قیمت"}
                    {...priceInputState.props}
                    type={"number"}
                    dir={"ltr"}
                    className={"numberInput"}
                />
                {priceInputState.value && <p>{formatMoney(+priceInputState.value)}</p>}
                {foodState && (
                    <img
                        src={foodState.image}
                        alt=''
                        style={{ objectFit: "contain", maxWidth: "300px", borderRadius: "30px" }}
                    />
                )}
                {foodState && <p>برای جایگزینی عکس، فایل جدید انتخاب کنید</p>}
                <input
                    type='file'
                    className={styles.fileInput}
                    accept='image/*'
                    onChange={imageChangeHandler}
                />
                {noImageError && <p style={{ color: "red" }}>فایل عکس انتخاب شود</p>}
                <Select
                    label={"دسته بندی اصلی"}
                    selectedValue={selectedCategory}
                    setValue={setSelectedCategory}
                    style={{ marginBottom: "1rem" }}
                >
                    <SelectOption value={""}>-----</SelectOption>
                    {categories &&
                        categories.map((category) => (
                            <SelectOption key={category.id} value={category.id}>
                                {category.name}
                            </SelectOption>
                        ))}
                </Select>
                <Select
                    label={"دسته بندی فرعی"}
                    selectedValue={selectedSubCategory}
                    setValue={setSelectedSubCategory}
                    style={{ marginBottom: "1rem" }}
                >
                    <SelectOption value={""}>-----</SelectOption>
                    {subCategories &&
                        subCategories.map((subCategory) => (
                            <SelectOption key={subCategory.id} value={subCategory.id}>
                                {subCategory.name}
                            </SelectOption>
                        ))}

                    {noSubCategoryError && <p style={{ color: "red" }}>دسته بندی مشخص شود</p>}
                </Select>
                <Button
                    type={"submit"}
                    color={"green"}
                    fullWidthOnMobile
                    style={{ padding: "1rem 2rem", margin: "0 auto", display: "block" }}
                >
                    ثبت
                </Button>
            </form>
        </Main>
    );
}
