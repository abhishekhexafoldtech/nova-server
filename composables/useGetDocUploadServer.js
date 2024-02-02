// importing admin related api end points for creating admin kyc doc, getting all admin kyc docs, getting server link for doc upload.
import { createNewKycDocModel, getKycDocs, getServerForDocUpload } from "~/api/global-api"

// here user userType declars  admin or company like wise.
export const getServerLink = async (userid, docName, userType) => {
    try {
        const getDocId = await getKycDocs({
            search: docName,   // searching if any doc exists with search name
        }, userType);
        if (getDocId.status === 200) {
            const result = await getDocId.data.items;
            // if doc exists 
            if (result.length) {
                const getServerUrl = await getDocServer(userid, result[0].id, userType); // getting the minio server links
                const { front_document_url, back_document_url, error } = getServerUrl;
                if (error) {
                    return {
                        error
                    }
                }
                return {
                    front_document_url,
                    back_document_url
                }
            } else {  // if doc does not exists
                const createDoc = await createKycDoc(docName, userType);  // creating a new doc name with id
                const getServerUrl = await getDocServer(userid, createDoc.id, userType); // getting minio server links
                const { front_document_url, back_document_url, error } = getServerUrl;
                if (error) {
                    return {
                        error
                    }
                }
                return {
                    front_document_url,
                    back_document_url
                }
            }
        } else {
            throw error("Bad request");
        }
    } catch (err) {
        throw err
    }
}

// getting minio server links
async function getDocServer(userId, docId, userType) {
    try {
        const getServerRes = await getServerForDocUpload(userId, {
            document_type: docId
        }, userType);
        const result = await getServerRes.data;
        return result
    } catch (err) {
        return {
            error: err.response
        }
    }
}

//   creating a new doc id
async function createKycDoc(docName, userType) {
    const newDoc = {
        document_name: docName,
    }
    try {
        const createRes = await createNewKycDocModel(newDoc, userType);
        const result = await createRes.data;
        return result
    } catch (err) {
        return {
            error: err.response
        }
    }

}