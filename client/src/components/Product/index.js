import React, { Component } from "react";
import PageTop from "../UI/PageTop";
import Spinner from "../UI/Spinner";
import ProductDetailHead from "./ProductDetailHead";
import ProductDetailDesc from "./ProductDetailDesc";
import MusicPlayer from "../UI/MusicPlayer/MusicPlayer";
import {
  openMusicPlayer,
  closeMusicPlayer,
  setAudio,
  setKitPlaying,
  playAudio,
  resetAudio,
  pauseAudio
} from "../../store/actions/musicPlayerActions";
import { getAllAudio } from "../../store/actions/audioTrackActions";
import {
  getProduct,
  clearProductDetail
} from "../../store/actions/productActions";
import { openCartModal } from "../../store/actions/modalActions";
import { addToCart } from "../../store/actions/userActions";
import { connect } from "react-redux";
class ProductDetail extends Component {
  state = {
    loading: true,
    error: false
  };
  componentDidMount() {
    this.loadProduct();
  }

  componentWillUnmount() {
    this.props.clearProductDetail();
  }

  loadProduct = () => {
    const id = this.props.match.params.id;
    this.props.getProduct(id).then(res => {
      if (res.payload) {
        this.props.getAllAudio().then(() => {
          this.setState({ loading: false, error: false });
        });
      } else {
        this.setState({
          loading: false,
          error: true
        });
      }
    });
  };

  onAddToCart = () => {
    this.props.addToCart(this.props.match.params.id);
    this.props.openCartModal();
  };

  renderDetailPage = () => {
    const kit = this.props.products.shownProduct;
    if (this.state.loading) {
      return <Spinner specialClassName="detail_page_spinner" />;
    } else {
      return (
        <div>
          <ProductDetailHead
            playDemoTrack={this.playDemoTrack}
            pauseDemoTrack={this.pauseDemoTrack}
            playing={this.props.musicPlayer.playing}
            addToCart={this.onAddToCart}
            users={this.props.users}
            kit={kit}
            route={this.props.history}
          />
          <ProductDetailDesc kit={kit} />
        </div>
      );
    }
  };

  render404 = () => {
    return (
      <div className="product_404">
        <div className="errorbox">
          <h1>404</h1>
        </div>
      </div>
    );
  };

  playDemoTrack = () => {
    let filename;
    let kitName;
    if (this.props.audioTracks && !this.props.musicPlayer.audio) {
      this.props.audioTracks.fileData.map(track => {
        if (this.props.products.shownProduct.demoTrack === track._id) {
          kitName = this.props.products.shownProduct.name;
          filename = track.filename;
        }
        return {
          filename,
          kitName
        };
      });
      this.props.setKitPlaying(kitName);
      this.props.setAudio(filename);
      this.props.playAudio();
      setTimeout(() => {
        this.props.musicPlayer.audio.play();
        this.props.openMusicPlayer();
        this.props.musicPlayer.audio.addEventListener("ended", () => {
          this.props.musicPlayer.audio.currentTime = 0;
          this.pauseDemoTrack();
        });
      }, 30);
    } else {
      this.props.musicPlayer.audio.play();
      this.props.playAudio();
      this.props.openMusicPlayer();
      this.props.musicPlayer.audio.addEventListener("ended", () => {
        this.props.musicPlayer.audio.currentTime = 0;
        this.pauseDemoTrack();
      });
    }
  };

  pauseDemoTrack = () => {
    this.props.pauseAudio();
    this.props.musicPlayer.audio.pause();
  };

  renderPageTopTitle = () => {
    if (this.props.products.shownProduct) {
      return this.props.products.shownProduct.name;
    } else if (!this.props.products.shownProduct && !this.state.error) {
      return "";
    } else if (!this.props.products.shownProduct && this.state.error) {
      return "Kit Doesn't Exist";
    }
  };
  render() {
    const { error } = this.state;
    return (
      <div>
        <PageTop title={this.renderPageTopTitle()} />
        {!error ? this.renderDetailPage() : this.render404()}
        <MusicPlayer closeMusicPlayer={this.props.closeMusicPlayer} />
      </div>
    );
  }
}

const mapStateToProps = ({
  products,
  musicPlayer,
  audioTracks,
  users,
  modals
}) => ({
  products,
  users,
  musicPlayer,
  audioTracks,
  userCartModalOpen: modals.userCartModalOpen
});

export default connect(
  mapStateToProps,
  {
    getProduct,
    clearProductDetail,
    getAllAudio,
    openMusicPlayer,
    closeMusicPlayer,
    setAudio,
    setKitPlaying,
    playAudio,
    resetAudio,
    pauseAudio,
    openCartModal,
    addToCart
  }
)(ProductDetail);
