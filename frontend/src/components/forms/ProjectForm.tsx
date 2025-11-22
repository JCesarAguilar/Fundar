import Image from "next/image";
import { IProject } from "@/interfaces/IProject";
import { addProject, updateProject } from "@/services/project.services";
import { uploadSingleImage } from "@/services/uploadImage.services";
import {
  editProjectValidationSchema,
  IProjectFormValues,
  projectFormInitialValues,
  projectValidationSchema,
} from "@/validators/addProjectSchema";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useProjects } from "@/context/ProjetsContext";
import { useAuth } from "@/context/AuthContext";

interface ProjectFormProps {
  project?: IProject | null;
  onSave: (values: IProjectFormValues) => void;
  onClose: () => void;
}

export default function ProjectForm({ project, onClose }: ProjectFormProps) {
  const { refreshProjects } = useProjects();
  const { dataUser } = useAuth();
  const token = dataUser?.token ?? "";

  const formik = useFormik<IProjectFormValues>({
    initialValues: project || projectFormInitialValues,
    validationSchema: project
      ? editProjectValidationSchema
      : projectValidationSchema,
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      try {
        // 1️⃣ Subir imágenes si son nuevas (tipo File)
        const uploadedUrls = await Promise.all(
          values.imageUrls.map(async (img: File | string) => {
            if (img instanceof File) {
              const url = await uploadSingleImage(img, token);
              return url;
            }
            return img;
          })
        );
        // 2️⃣ Crear objeto del nuevo proyecto
        const newProject = {
          title: values.title.trim(),
          resume: values.resume.trim(),
          description: values.description.trim(),
          imageUrls: uploadedUrls.filter(Boolean), // evita nulls o vacíos
          country: values.country,
          goalAmount: Number(values.goalAmount),
        };
        // 3️⃣ Enviar al backend
        if (project?.id) {
          await updateProject(token, project.id, newProject);
          toast.success("Project updated succesfully");
        } else {
          await addProject(newProject, token);
          toast.success("Project created successfully");
        }
        await refreshProjects();
        resetForm();
        onClose();
      } catch (error) {
        console.error("❌ Error al crear el proyecto:", error);
        toast.error("Error creatin project");
      }
    },
  });

  return (
    <div className="bg-white-smoke rounded-xl p-6 w-[60vw] shadow-lg">
      <form
        onSubmit={formik.handleSubmit}
        onSubmitCapture={formik.handleSubmit}
      >
        <h3 className="text-xl font-semibold mb-4">
          {project ? "Edit Project" : "Add Project"}
        </h3>
        <div className="flex gap-7">
          <div className="w-1/2 flex flex-col gap-1.5">
            <label htmlFor="title" className="form-label-sec">
              Tittle
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Max 50 characters"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input-sec"
            />
            {formik.errors.title && formik.touched.title ? (
              <p id="email-errors" className="text-red-500">
                {formik.errors.title}
              </p>
            ) : null}

            <label htmlFor="resume" className="form-label-sec">
              Resume
            </label>
            <input
              id="resume"
              type="text"
              name="resume"
              placeholder="Max 180 characters"
              value={formik.values.resume}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input-sec"
            />
            {formik.errors.resume && formik.touched.resume ? (
              <p id="email-errors" className="text-red-500">
                {formik.errors.resume}
              </p>
            ) : null}

            <label htmlFor="description" className="form-label-sec">
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              placeholder="Max 600 characters"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input-sec"
            />
            {formik.errors.description && formik.touched.description ? (
              <p id="email-errors" className="text-red-500">
                {formik.errors.description}
              </p>
            ) : null}

            <label htmlFor="country" className="form-label-sec">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-input-sec"
            >
              <option value="">Select a country</option>
              <option value="Argentina">Argentina</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Brazil">Brazil</option>
              <option value="Chile">Chile</option>
              <option value="Colombia">Colombia</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Cuba">Cuba</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Honduras">Honduras</option>
              <option value="Mexico">Mexico</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Panama">Panama</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Venezuela">Venezuela</option>
            </select>

            {formik.errors.country && formik.touched.country ? (
              <p id="email-errors" className="text-red-500">
                {formik.errors.country}
              </p>
            ) : null}

            <label htmlFor="goalAmount" className="form-label-sec">
              Goal Amount
            </label>
            <input
              id="goalAmount"
              type="number"
              name="goalAmount"
              value={formik.values.goalAmount}
              onChange={formik.handleChange}
              className="form-input-sec"
            />
            {formik.errors.goalAmount && formik.touched.goalAmount ? (
              <p id="goalAmount-errors" className="text-red-500">
                {formik.errors.goalAmount}
              </p>
            ) : null}
          </div>

          <div className="w-1/2 flex flex-col">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-1">
                  <label
                    htmlFor={`image-${index}`}
                    className="form-label-sec mb-1.5 block"
                  >
                    Image {index + 1}
                  </label>
                  <input
                    id={`image-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.currentTarget.files?.[0];
                      if (!file) return;
                      try {
                        // Mostrar un preview rápido mientras sube
                        formik.setFieldValue(`imageUrls[${index}]`, file);
                        // Subir al backend inmediatamente
                        const url = await uploadSingleImage(file, token);
                        // Reemplazar el File por la URL definitiva
                        formik.setFieldValue(`imageUrls[${index}]`, url);
                      } catch (err) {
                        console.error("❌ Error al subir imagen:", err);
                      }
                    }}
                  />
                  <div className="flex gap-3">
                    <label
                      htmlFor={`image-${index}`}
                      className="w-full border rounded-lg px-4 mb-1.5 block cursor-pointer py-2 hover:bg-gray-soft transition"
                    >
                      📁{" "}
                      {formik.values.imageUrls[index]
                        ? "Cambiar imagen"
                        : "Seleccionar imagen"}
                    </label>
                    <div className="w-10 h-10 relative flex items-center justify-center border border-gray-medium rounded overflow-hidden bg-gray-50">
                      {formik.values.imageUrls[index] ? (
                        <Image
                          src={
                            typeof formik.values.imageUrls[index] === "string"
                              ? formik.values.imageUrls[index]
                              : URL.createObjectURL(
                                  formik.values.imageUrls[index]
                                )
                          }
                          alt={`Preview ${index + 1}`}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-medium text-center text-[9px]">
                          No image
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 rounded-lg bg-blue-strong text-white hover:bg-blue-medium cursor-pointer"
          >
            {project
              ? formik.isSubmitting
                ? "Saving..."
                : "Save Changes"
              : formik.isSubmitting
              ? "Creating..."
              : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
