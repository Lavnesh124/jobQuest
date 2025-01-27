import Company from "../models/companyModel.js";



export const check = async (req, res) => {
    console.log("hello");
    return res.status(404).json({
        message: "hello world",
        success: false
    })


}

export const registerCompany = async (req, res) => {

    try {
        const { companyName } = req.body;
        console.log(req.body);
        if (!companyName) {
            console.log(companyName);
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userid: req.id

        })

        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: "true",
        })

    }
    catch (err) {
        console.log(err);
    }
}


export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        //  console.log("l");
        const companies = await Company.find({ userid: userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById({ _id: companyId });
        if (!company) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }

        return res.status(200).json({
            company,
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}



export const updateCompany = async (req, res) => {
    try {
        const { name, description, websites, location } = req.body;
        if (!name && !description && !websites && !location) {
            return res.status(400).json({
                message: "No update data provided",
                success: false
            });
        }
        const file = req.file;

        const updateData = { name, description, websites, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })


    } catch (error) {
        console.log(error);
    }
}