import { AuthModel } from '@root/feactures/auth/models/auth.model';
import { ImageModel } from '@root/feactures/images/models/image.schema';
import { PostModel } from '@root/feactures/post/models/post.schema';
import { ReelModel } from '@root/feactures/stories/models/reels.schemes';
import { StoryModel } from '@root/feactures/stories/models/stories.schemes';
import { ContactInfoModel } from '@root/feactures/user/models/ContactInfo';
import { EducationInfoModel } from '@root/feactures/user/models/EducationInfo';
import { JobInfoModel } from '@root/feactures/user/models/JobInfo';
import { SocialModel } from '@root/feactures/user/models/Social';
import { UserModel } from '@root/feactures/user/models/user.model';


class ModelService {
  constructor() {
    this.initializeModels();
  }

  initializeModels() {
    // Instanciar los modelos para asegurar que las colecciones se creen
    this.createModelInstances();
  }

  private async createModelInstances() {
    // Crear instancias de modelos para asegurarse de que las colecciones existan
    await UserModel.createCollection();
    await AuthModel.createCollection();
    await ReelModel.createCollection();
    await PostModel.createCollection();
    await StoryModel.createCollection();
    await ImageModel.createCollection();
    await ContactInfoModel.createCollection();
    await EducationInfoModel.createCollection();
    await JobInfoModel.createCollection();
    await SocialModel.createCollection();
  }
}

export const modelService = new ModelService();
