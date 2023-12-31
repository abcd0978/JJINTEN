import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { addPost } from "../redux/modules/posts";
import { styled } from "styled-components";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import EditorComponent from "./EditorComponent";

function Form({ formModal, setFormModal }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const state = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let fileURL = null;
    if (selectedFile) {
      fileURL = selectedFile;
    }
    if (!title || !body || !category) {
      alert("필수값이 누락되었습니다. 확인해주세요.");
      return;
    }

    try {
      const data = {
        id: shortid.generate(),
        category: category,
        title: title,
        body: body,
        createdAt: new Date().toString(),
        isModified: false,
        fileURL: fileURL,
        uid: state.uid,
        views: 0,
        commentNumber: 0,
        likeNumber: 0,
        likePeople: [],
        writer: user.displayName,
      };
      await addDoc(collection(db, "posts"), data);
      window.location.reload();
      dispatch(addPost(data));
      // 입력 필드 초기화
      setCategory("");
      setTitle("");
      setBody("");
      // 입력창 닫기
      setFormModal(false);
    } catch (error) {
      console.error("데이터 추가 에러:", error);
    }
  };

  // 취소 버튼
  const cancelButtonHandler = () => {
    setFormModal(false);
  };

  return (
    <>
      {formModal ? (
        <StModalBox>
          <StModalContent>
            <form onSubmit={handleSubmit}>
              <div>
                <StSelectBox value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="">select category</option>
                  <option value="콘서트">콘서트</option>
                  <option value="전시">전시</option>
                  <option value="클래식">클래식</option>
                  <option value="연극">연극</option>
                  <option value="뮤지컬">뮤지컬</option>
                  <option value="페스티벌">페스티벌</option>
                </StSelectBox>
              </div>
              <div>
                <StTitleInput
                  type="text"
                  name="title"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <EditorComponent setBody={setBody} setSelectedFile={setSelectedFile} />
              </div>
              <ButtonContainer>
                <Stbutton marginRight="0px" onClick={cancelButtonHandler}>
                  취소
                </Stbutton>
                <Stbutton type="submit">작성</Stbutton>
              </ButtonContainer>
            </form>
          </StModalContent>
        </StModalBox>
      ) : (
        <> </>
      )}
    </>
  );
}

export default Form;

const StModalBox = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
`;

const StModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 700px;
  height: 600px;
  border-radius: 10px;
`;

const StSelectBox = styled.select`
  width: 150px;
  height: 30px;
  margin-left: 10px;
  margin-top: 20px;
  padding: 5px;
  font-size: 15px;
`;

const StTitleInput = styled.input`
  width: 250px;
  height: 35px;
  margin: 10px;
  font-size: 25px;
  font-weight: bold;
  padding: 5px;
  border: none;
  outline: none;
`;

const StBodyInput = styled.textarea`
  width: 660px;
  height: 280px;
  margin-left: 10px;
  font-size: 15px;
  padding: 10px;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  float: right;
`;

const Stbutton = styled.button`
  width: 100px;
  height: 35px;
  color: #fff;
  background-color: #bd0965;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  margin: 10px;
  margin-right: ${({ marginRight }) => marginRight};
  padding: 5px;
`;
